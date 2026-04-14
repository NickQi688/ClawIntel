# Obsidian to IMA 自动化工具

## 简介

这个自动化工具可以一键将 Obsidian 笔记转换为 PDF 并上传到 IMA 知识库。

## 功能特点

✅ **自动化流程**：一键完成笔记→PDF→知识库
✅ **批量处理**：支持批量上传多个笔记
✅ **灵活配置**：支持指定知识库和文件夹
✅ **中文支持**：完美支持中文内容

## 快速开始

### 1. 安装依赖

```bash
# macOS
brew install pandoc

# Linux
sudo apt-get install pandoc

# 安装 Node.js 依赖（如果需要）
cd .claude/skills/obsidian-to-ima
npm install
```

### 2. 配置 IMA 凭证

```bash
# 方法1：环境变量
export IMA_OPENAPI_CLIENTID="your_client_id"
export IMA_OPENAPI_APIKEY="your_api_key"

# 方法2：配置文件（推荐）
mkdir -p ~/.config/ima
echo "your_client_id" > ~/.config/ima/client_id
echo "your_api_key" > ~/.config/ima/api_key
```

### 3. 使用

```bash
# 上传单个笔记
node .claude/skills/obsidian-to-ima/index.js "自媒体内容/文章.md" --project "知识库名称" --folder "文件夹名"

# 上传当前打开的笔记
node .claude/skills/obsidian-to-ima/index.js --current --project "知识库名称" --folder "文件夹名"
```

## 使用场景

### 场景1：上传单篇文章到知识库

```bash
node .claude/skills/obsidian-to-ima/index.js \
  "自媒体内容/我暂停 OpenClaw 的真相.md" \
  --project "自媒体素材库" \
  --folder "2024年文章"
```

### 场景2：批量上传自媒体内容

```bash
# 批量上传所有 md 文件
for file in 自媒体内容/*.md; do
  node .claude/skills/obsidian-to-ima/index.js "$file" --project "自媒体素材库"
done
```

### 场景3：与 Obsidian 工作流集成

在 Obsidian 中创建自定义命令或快捷键，调用此脚本快速上传笔记。

## 注意事项

1. **首次使用前**必须先配置 IMA 凭证
2. 确保 Pandoc 已安装（用于 PDF 转换）
3. 知识库名称必须存在且可访问
4. 文件夹名称不存在时会自动上传到根目录

## 故障排除

### Pandoc 未安装

```
❌ Pandoc 未安装
```

**解决方案**：
```bash
brew install pandoc  # macOS
sudo apt-get install pandoc  # Linux
```

### IMA 凭证未配置

```
❌ IMA 凭证未配置
```

**解决方案**：配置环境变量或创建配置文件

### 知识库不存在

```
❌ 未找到知识库
```

**解决方案**：检查知识库名称是否正确，确保有访问权限

### file_ext 参数错误

```
❌ invalid CreateMediaReq.FileExt: value does not match regex pattern
```

**原因**：IMA API 的 `file_ext` 字段只接受字母数字字符，**不能包含点号**

**解决方案**：
- ✅ 正确：`file_ext: "pdf"` 或 `file_ext: "md"`
- ❌ 错误：`file_ext: ".pdf"` 或 `file_ext: ".md"`

脚本 v1.0.1 已修复此问题，请确保使用最新版本。

## 进阶使用

### 自定义 PDF 样式

编辑 `index.js` 中的 Pandoc 命令参数：

```javascript
execSync(
  `pandoc "${markdownPath}" -o "${pdfPath}" --pdf-engine=xelatex -V CJKmainfont="PingFang SC" -N --toc`,
  { stdio: 'inherit' }
);
```

### 批量处理优化

创建批量处理脚本：

```bash
#!/bin/bash
# batch-upload.sh

PROJECT="自媒体素材库"
FOLDER="2024年文章"

for file in "$@"; do
  echo "处理: $file"
  node .claude/skills/obsidian-to-ima/index.js "$file" --project "$PROJECT" --folder "$FOLDER"
  echo "---"
done
```

使用：
```bash
chmod +x batch-upload.sh
./batch-upload.sh "自媒体内容"/*.md
```

## 技术支持

如有问题或建议，请在 GitHub Issues 中反馈。
