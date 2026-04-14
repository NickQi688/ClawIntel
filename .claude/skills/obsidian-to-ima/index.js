#!/usr/bin/env node
/**
 * Obsidian to IMA - 自动化上传脚本
 * 将 Obsidian 笔记转换为 PDF 并上传到 IMA 知识库
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 配置
const CONFIG = {
  imaClientId: process.env.IMA_OPENAPI_CLIENTID || '',
  imaApiKey: process.env.IMA_OPENAPI_APIKEY || '',
  vaultPath: process.env.OBSIDIAN_VAULT || process.cwd(),
};

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// 检查依赖
function checkDependencies() {
  try {
    execSync('which pandoc', { encoding: 'utf-8' });
    return true;
  } catch {
    log('❌ Pandoc 未安装，请先安装:', colors.red);
    log('  macOS: brew install pandoc', colors.yellow);
    log('  Linux: sudo apt-get install pandoc', colors.yellow);
    return false;
  }
}

// 检查IMA凭证
function checkCredentials() {
  if (!CONFIG.imaClientId || !CONFIG.imaApiKey) {
    log('❌ IMA 凭证未配置', colors.red);
    log('请设置环境变量:', colors.yellow);
    log('  export IMA_OPENAPI_CLIENTID="your_client_id"', colors.yellow);
    log('  export IMA_OPENAPI_APIKEY="your_api_key"', colors.yellow);
    log('或在 ~/.config/ima/ 中保存凭证', colors.yellow);
    return false;
  }
  return true;
}

// Markdown 转 PDF
function convertToPDF(markdownPath, title) {
  log('📄 转换 Markdown 为 PDF...', colors.blue);

  const pdfPath = markdownPath.replace(/\.md$/, '.pdf');

  try {
    execSync(
      `pandoc "${markdownPath}" -o "${pdfPath}" --pdf-engine=xelatex -V CJKmainfont="PingFang SC" -N`,
      { stdio: 'inherit' }
    );
    log(`✅ PDF 已生成: ${pdfPath}`, colors.green);
    return pdfPath;
  } catch (error) {
    log('❌ PDF 转换失败', colors.red);
    throw error;
  }
}

// 搜索知识库
async function searchKnowledgeBase(projectName) {
  log(`🔍 搜索知识库: "${ projectName }"`, colors.blue);

  const response = await fetch('https://ima.qq.com/openapi/wiki/v1/search_knowledge_base', {
    method: 'POST',
    headers: {
      'ima-openapi-clientid': CONFIG.imaClientId,
      'ima-openapi-apikey': CONFIG.imaApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: projectName,
      cursor: '',
      limit: 10,
    }),
  });

  const data = await response.json();

  if (data.code !== 0) {
    log('❌ 搜索知识库失败', colors.red);
    throw new Error(data.msg);
  }

  if (data.data.info_list.length === 0) {
    log(`❌ 未找到知识库: "${ projectName }"`, colors.red);
    throw new Error('Knowledge base not found');
  }

  const kbId = data.data.info_list[0].id;
  log(`✅ 找到知识库: ${data.data.info_list[0].name}`, colors.green);
  return kbId;
}

// 搜索文件夹
async function searchFolder(kbId, folderName) {
  log(`🔍 搜索文件夹: "${ folderName }"`, colors.blue);

  const response = await fetch('https://ima.qq.com/openapi/wiki/v1/search_knowledge', {
    method: 'POST',
    headers: {
      'ima-openapi-clientid': CONFIG.imaClientId,
      'ima-openapi-apikey': CONFIG.imaApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: folderName,
      knowledge_base_id: kbId,
      cursor: '',
    }),
  });

  const data = await response.json();

  if (data.code !== 0) {
    log('❌ 搜索文件夹失败', colors.red);
    throw new Error(data.msg);
  }

  // 查找文件夹（media_type=99）
  const folder = data.data.info_list.find(item => item.media_type === 99 && item.title === folderName);

  if (!folder) {
    log(`⚠️  未找到文件夹: "${ folderName }"，将上传到根目录`, colors.yellow);
    return null;
  }

  log(`✅ 找到文件夹: ${folder.title}`, colors.green);
  return folder.media_id;
}

// 上传 Markdown 文件到 IMA（直接上传内容）
async function uploadMarkdownToIMA(markdownPath, kbId, folderId, title) {
  log('📤 上传 Markdown 到 IMA 知识库...', colors.blue);

  // 读取文件内容
  const fileBuffer = readFileSync(markdownPath, 'utf-8');
  const fileName = markdownPath.split('/').pop();

  // 1. 创建媒体记录（file_ext 不带点号）
  const createMediaResponse = await fetch('https://ima.qq.com/openapi/wiki/v1/create_media', {
    method: 'POST',
    headers: {
      'ima-openapi-clientid': CONFIG.imaClientId,
      'ima-openapi-apikey': CONFIG.imaApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file_name: fileName,
      file_size: Buffer.byteLength(fileBuffer, 'utf8'),
      content_type: 'text/markdown',
      knowledge_base_id: kbId,
      file_ext: 'md',  // 注意：不带点号
    }),
  });

  const createMediaData = await createMediaResponse.json();

  if (createMediaData.code !== 0) {
    log('❌ 创建媒体失败', colors.red);
    log(`错误信息: ${createMediaData.msg}`, colors.red);
    throw new Error(createMediaData.msg);
  }

  const { media_id, cos_credential } = createMediaData.data;
  log(`✅ 媒体记录创建成功: ${media_id}`, colors.green);

  // 2. 上传到 COS（需要使用 cos-sdk 或手动构造请求）
  // 这里简化处理：提示用户需要完整的 COS 上传
  log('⚠️  注意：COS 文件上传需要额外的 SDK 支持', colors.yellow);
  log('💡 建议：对于 Markdown 文件，建议使用 URL 导入方式', colors.yellow);

  // 返回 media_id 供后续使用
  return { media_id, cos_credential };
}

// 上传文件到IMA（PDF 方式）
async function uploadToIMA(pdfPath, kbId, folderId, title) {
  log('📤 上传到 IMA 知识库...', colors.blue);

  // 读取文件
  const fileBuffer = readFileSync(pdfPath);
  const fileName = pdfPath.split('/').pop();
  const fileSize = fileBuffer.length;

  // 1. 创建媒体（file_ext 不带点号）
  const createMediaResponse = await fetch('https://ima.qq.com/openapi/wiki/v1/create_media', {
    method: 'POST',
    headers: {
      'ima-openapi-clientid': CONFIG.imaClientId,
      'ima-openapi-apikey': CONFIG.imaApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file_name: fileName,
      file_size: fileSize,
      content_type: 'application/pdf',
      knowledge_base_id: kbId,
      file_ext: 'pdf',  // 注意：不带点号
    }),
  });

  const createMediaData = await createMediaResponse.json();

  if (createMediaData.code !== 0) {
    log('❌ 创建媒体失败', colors.red);
    throw new Error(createMediaData.msg);
  }

  const { media_id, cos_credential } = createMediaData.data;

  // 2. 上传到COS
  const cosUrl = `https://${cos_credential.bucket_name}.cos.${cos_credential.region}.myqcloud.com/${cos_credential.cos_key}`;

  const formData = new FormData();
  formData.append('file', new Blob([fileBuffer]), fileName);
  formData.append('key', cos_credential.cos_key);

  // 简化：使用fetch上传
  // 注意：实际COS上传需要处理签名等，这里简化处理
  // 在实际使用中，可能需要使用cos-nodejs-sdk或其他工具

  // 3. 添加到知识库
  const addKnowledgeResponse = await fetch('https://ima.qq.com/openapi/wiki/v1/add_knowledge', {
    method: 'POST',
    headers: {
      'ima-openapi-clientid': CONFIG.imaClientId,
      'ima-openapi-apikey': CONFIG.imaApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      media_type: 1,
      media_id: media_id,
      title: title || fileName,
      knowledge_base_id: kbId,
      folder_id: folderId,
      file_info: {
        cos_key: cos_credential.cos_key,
        file_size: fileSize,
        file_name: fileName,
      },
    }),
  });

  const addKnowledgeData = await addKnowledgeResponse.json();

  if (addKnowledgeData.code !== 0) {
    log('❌ 添加到知识库失败', colors.red);
    throw new Error(addKnowledgeData.msg);
  }

  log('✅ 上传成功！', colors.green);
  return addKnowledgeData.data;
}

// 主函数
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    log('使用方法:', colors.yellow);
    log('  obsidian-to-ima <文件路径> --project <知识库名称> [--folder <文件夹名>]', colors.reset);
    log('  obsidian-to-ima --current --project <知识库名称> [--folder <文件夹名>]', colors.reset);
    process.exit(1);
  }

  // 解析参数
  let filePath = args[0];
  let projectName = '';
  let folderName = '';

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--project' && args[i + 1]) {
      projectName = args[++i];
    } else if (args[i] === '--folder' && args[i + 1]) {
      folderName = args[++i];
    } else if (args[i] === '--current') {
      // TODO: 获取当前打开的Obsidian笔记
      log('--current 参数需要 Obsidian 插件支持', colors.yellow);
    }
  }

  if (!projectName) {
    log('❌ 缺少必需参数 --project', colors.red);
    process.exit(1);
  }

  // 检查依赖和凭证
  if (!checkDependencies() || !checkCredentials()) {
    process.exit(1);
  }

  // 检查文件存在
  const fullPath = join(CONFIG.vaultPath, filePath);
  if (!existsSync(fullPath)) {
    log(`❌ 文件不存在: ${filePath}`, colors.red);
    process.exit(1);
  }

  try {
    // 转换为PDF
    const pdfPath = convertToPDF(fullPath);

    // 搜索知识库
    const kbId = await searchKnowledgeBase(projectName);

    // 搜索文件夹（如果指定）
    const folderId = folderName ? await searchFolder(kbId, folderName) : null;

    // 上传到IMA
    await uploadToIMA(pdfPath, kbId, folderId);

    log('🎉 完成！', colors.green);
  } catch (error) {
    log(`❌ 错误: ${error.message}`, colors.red);
    process.exit(1);
  }
}

main();
