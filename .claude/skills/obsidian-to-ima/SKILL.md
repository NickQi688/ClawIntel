# Obsidian to IMA

自动化将 Obsidian 笔记转换为 PDF 并上传到 IMA 知识库。

## 功能

- 自动读取 Obsidian 笔记
- 转换为 PDF 格式
- 上传到指定 IMA 知识库和文件夹

## 使用方法

```bash
# 上传单个笔记
obsidian-to-ima "自媒体内容/文章.md" --project "知识库名称" --folder "文件夹名"

# 批量上传
obsidian-to-ima "自媒体内容/*.md" --project "知识库名称" --folder "文件夹名"

# 上传当前打开的笔记
obsidian-to-ima --current --project "知识库名称" --folder "文件夹名"
```

## 配置

首次使用前需要配置 IMA 凭证：

```bash
# 配置 Client ID
echo "your_client_id" > ~/.config/ima/client_id

# 配置 API Key
echo "your_api_key" > ~/.config/ima/api_key
```

## 依赖

- Pandoc（用于 Markdown 转 PDF）
- IMA API 凭证
- Python 3+

## 安装依赖

```bash
# macOS
brew install pandoc

# Linux
sudo apt-get install pandoc
```

## 工作流程

1. 读取 Obsidian 笔记（Markdown 格式）
2. 使用 Pandoc 转换为 PDF
3. 调用 IMA API 上传到知识库
4. 返回上传结果

## 参数说明

| 参数 | 说明 | 必需 |
|------|------|------|
| `--file` | 笔记文件路径 | 是（或使用--current） |
| `--current` | 使用当前打开的笔记 | 否 |
| `--project` | IMA 知识库名称 | 是 |
| `--folder` | 文件夹名称（可选） | 否 |
| `--title` | 自定义 PDF 标题（默认使用笔记标题） | 否 |

## 示例

```bash
# 上传当前文章到"Coze智能体实战案例"的"其他工作流"文件夹
obsidian-to-ima --current --project "Coze智能体实战案例（工作流源码合集）" --folder "其他工作流"

# 批量上传自媒体内容
obsidian-to-ima "自媒体内容/*.md" --project "自媒体素材库" --folder "2024年文章"
```
