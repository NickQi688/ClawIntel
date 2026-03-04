#!/usr/bin/env node

/**
 * Kimi API 测试脚本
 * 测试阿里百炼 Kimi 2.5 接入
 */

import { KimiAPI } from './kimi-api.mjs';

async function testBasicChat() {
  console.log('🧪 测试 1: 基础对话\n');

  try {
    const response = await KimiAPI.chat({
      messages: [
        {
          role: 'user',
          content: '你好，请用一句话介绍你自己'
        }
      ],
      temperature: 0.7,
      maxTokens: 100
    });

    console.log('✅ 基础对话成功:');
    console.log(response.choices?.[0]?.message?.content || '无回复');
    console.log('\n');
  } catch (error) {
    console.error('❌ 基础对话失败:', error.message);
    return false;
  }

  return true;
}

async function testCryptoAnalysis() {
  console.log('🧪 测试 2: 币圈分析\n');

  try {
    const newsData = [
      { title: 'BTC 突破 90000 USD 创历史新高' },
      { title: '以太坊 Layer2 TVL 突破 500 亿美元' }
    ];

    const analysis = await KimiAPI.analyzeCrypto(
      '现在买入 BTC 风险大吗？',
      newsData
    );

    console.log('✅ 币圈分析成功:');
    console.log(analysis);
    console.log('\n');
  } catch (error) {
    console.error('❌ 币圈分析失败:', error.message);
    return false;
  }

  return true;
}

async function testStreamChat() {
  console.log('🧪 测试 3: 流式对话\n');

  try {
    let fullContent = '';

    await KimiAPI.chatStream({
      messages: [
        {
          role: 'user',
          content: '用 3 个词形容加密货币市场'
        }
      ],
      temperature: 0.7,
      maxTokens: 100
    }, (chunk) => {
      process.stdout.write(chunk);
      fullContent += chunk;
    });

    console.log('\n\n✅ 流式对话完成');
    console.log('\n');
  } catch (error) {
    console.error('❌ 流式对话失败:', error.message);
    return false;
  }

  return true;
}

async function testSimpleAsk() {
  console.log('🧪 测试 4: 简单问答\n');

  try {
    const answer = await KimiAPI.ask(
      'Kimi 2.5 有什么特点？',
      '你是一个 AI 助手，用简洁的语言回答问题。'
    );

    console.log('✅ 简单问答成功:');
    console.log(answer);
    console.log('\n');
  } catch (error) {
    console.error('❌ 简单问答失败:', error.message);
    return false;
  }

  return true;
}

// 主测试函数
async function main() {
  console.log('========================================');
  console.log('   阿里百炼 Kimi 2.5 API 测试');
  console.log('========================================\n');

  const results = [];

  results.push(await testBasicChat());
  results.push(await testCryptoAnalysis());
  results.push(await testStreamChat());
  results.push(await testSimpleAsk());

  // 统计结果
  const passed = results.filter(r => r).length;
  const total = results.length;

  console.log('========================================');
  console.log(`   测试结果: ${passed}/${total} 通过`);
  console.log('========================================\n');

  if (passed === total) {
    console.log('🎉 所有测试通过！Kimi API 接入成功！\n');
    console.log('💡 使用示例:');
    console.log('   import { KimiAPI } from "./skills/crypto-api/kimi-api.mjs";');
    console.log('   const answer = await KimiAPI.ask("你的问题");');
    console.log('   console.log(answer);\n');
  } else {
    console.log('⚠️  部分测试失败，请检查配置:\n');
    console.log('   1. 确认 .env 文件中有 KIMI_API_KEY');
    console.log('   2. 确认 API Key 是阿里百炼平台获取的');
    console.log('   3. 确认网络连接正常\n');
  }
}

// 运行测试
main().catch(console.error);
