# Life-OS URL 智能抓取功能需求文档
**版本**: v1.0  
**目标**: 集成 url-reader 技能，实现"输入链接→自动抓取→同步 Obsidian"的完整工作流  
**当前文件**: `/Users/a2222/Downloads/life-os-main/src/App.jsx`

---

## 一、已完成的工作 (What We Did)

### 1. Life-OS 基础架构修复
- ✅ **修复白屏问题**: `githubService.js` 缺少实例化 (`const githubService = new GithubService()`)
- ✅ **GitHub 同步验证**: 用户成功发送第一条灵感到 `选题管理/00-碎片想法/`
- ✅ **AI 配置**: 集成 Gemini 3 Flash (OpenRouter) 和 DeepSeek 双引擎

### 2. 当前问题识别
**用户反馈**: 发送 Twitter 链接 `https://x.com/guishou_56/status/2019776378959462799`
- ❌ **链接丢失**: AI 生成的 Markdown 没有保留原始 URL
- ❌ **内容偏差**: AI 只根据标题"脑补"内容，没有真正读取网页
- ❌ **格式问题**: 缺少"原文链接"溯源

### 3. 初步修复尝试
已修改 `App.jsx` 的 `AiService.optimize()` 方法，添加:
- Jina Reader 集成: `https://r.jina.ai/{URL}`
- 强制保留链接: 提示词要求返回 `"原文链接: [URL]"`
- 自动 URL 检测: 正则提取 `https?://` 开头的链接

---

## 二、当前正在进行 (What We're Doing)

### 修改中的代码位置
**文件**: `/Users/a2222/Downloads/life-os-main/src/App.jsx`  
**类**: `AiService`  
**方法**: `async optimize(titleInput, contentInput, type)`

**当前修改状态**:
```javascript
// 新增: URL 检测和 Jina 抓取
const urlRegex = /(https?:\/\/[^\s]+)/g;
const foundUrls = (titleInput + " " + (contentInput || "")).match(urlRegex);

if (foundUrls && foundUrls.length > 0) {
  try {
    const jinaUrl = `https://r.jina.ai/${foundUrls[0]}`;
    const jinaRes = await fetch(jinaUrl, { headers: { 'Accept': 'text/markdown' }});
    if (jinaRes.ok) {
      const fetchedMd = await jinaRes.text();
      finalContent = `[自动抓取全文内容]:\n${fetchedMd.substring(0, 3000)}...`;
    }
  } catch (e) { /* fallback */ }
}
```

---

## 三、需要集成的完整功能 (Requirements)

### 需求来源
**参考项目**: `https://github.com/yhslgg-arch/url-reader`  
**核心能力**: 三层降级策略抓取任意网站 (微信公众号、小红书、知乎、抖音等)

### 功能需求 1: 网页端轻量抓取 (Jina 模式)
**优先级**: P0 (立即实现)  
**技术方案**: 纯前端，调用 `r.jina.ai` API

**具体要求**:
1. **URL 自动识别**: 检测输入是否包含 `http/https` 链接
2. **Jina 抓取**: 
   - 请求: `GET https://r.jina.ai/{encoded_url}`
   - Headers: `Accept: text/markdown`
   - 超时: 10秒
3. **内容处理**:
   - 截取前 3000 字符 (避免 Token 超限)
   - 保留原始 URL 在末尾: `\n\n原文链接: {url}`
4. **错误降级**: Jina 失败时，回退到原始 AI 摘要模式
5. **平台适配**: 针对 Twitter/X 特殊处理 (Jina 对 X 支持较好)

### 功能需求 2: 本地 MCP 重度抓取 (Playwright 模式)
**优先级**: P1 (下一步实现)  
**技术方案**: Python 脚本作为本地 MCP 服务

**架构设计**:
```
用户输入 URL → Life-OS 网页 → GitHub 同步 → 本地 MCP 监控 → Playwright 抓取 → 覆盖原文件
```

**具体要求**:
1. **三层降级策略**:
   - L1: Firecrawl (AI 驱动，96% 成功率，需 API Key)
   - L2: Jina Reader (免费，简单网站)
   - L3: Playwright (浏览器自动化，需登录态)
2. **平台识别**:
   - 微信: `mp.weixin.qq.com` (短链接优先，长链接易触发验证)
   - 小红书: `xiaohongshu.com`, `xhslink.com` (需 Referer 头)
   - 知乎: `zhihu.com`
   - 抖音: `douyin.com`
   - B站: `bilibili.com`
3. **图片处理**:
   - 下载图片到本地 `attachments/` 目录
   - 替换 Markdown 中的图片 URL 为本地路径
   - 不同平台设置不同 Referer (小红书必须 `https://www.xiaohongshu.com/`)
4. **文件保存**:
   - 目录命名: `{日期}_{标题}/`
   - 图片命名: `img_01.jpg`, `img_02.jpg`...
   - Markdown 元数据: title, source, url, date, tags

### 功能需求 3: 内容优化与 AI 增强
**优先级**: P2  
**要求**:
1. **标题提取**: 跳过"来源: xxx"等元数据，提取真正标题
2. **自动标签**: AI 根据内容识别平台类型 (微信/小红书/知乎) 和内容方向 (AI/商业模式/个人成长)
3. **摘要生成**: 如果内容过长 (>5000字)，AI 生成 3 行核心摘要
4. **去重检查**: 检查是否已保存过相同 URL，避免重复

---

## 四、技术实现细节 (Technical Details)

### 文件结构
```
/Users/a2222/Downloads/life-os-main/
├── src/
│   ├── App.jsx              # [修改中] AiService 类
│   ├── services/
│   │   └── githubService.js # [已修复] GitHub 推送服务
│   └── ...
└── [新增] mcp-url-reader/   # [待创建] Python MCP 服务
    ├── url_reader.py
    ├── requirements.txt
    └── config.json
```

### 关键代码片段要求

**1. URL 检测正则**:
```javascript
const urlRegex = /(https?:\/\/[^\s]+)/gi;
```

**2. Jina 请求**:
```javascript
const response = await fetch(`https://r.jina.ai/${encodeURIComponent(url)}`, {
  headers: { 
    'Accept': 'text/markdown',
    'User-Agent': 'Life-OS/1.0'
  }
});
```

**3. Markdown 模板**:
```markdown
---
title: "{提取的标题}"
date: 2026-02-07
type: "灵感"
source: "{平台名称}"
url: "{原始URL}"
tags: ["自动抓取", "{方向}"]
---

{抓取的正文内容}

---
*原文链接: {URL}*  
*抓取时间: {timestamp}*
```

---

## 五、下一步行动计划 (Next Steps)

### 立即执行 (Now)
1. ✅ **完成网页端 Jina 集成**: 修改 `App.jsx` 中的 `optimize` 方法
2. 🔄 **测试验证**: 用几个不同平台链接测试 (Twitter/微信/小红书)
3. 🔄 **错误处理**: 完善 Jina 失败时的降级逻辑

### 短期目标 (This Week)
4. ⏳ **创建 MCP 技能**: 在 `~/.claude/skills/mcp-url-reader/` 创建 Python 服务
5. ⏳ **本地监控脚本**: 监听 GitHub 仓库新文件，自动触发 Playwright 深度抓取
6. ⏳ **图片下载**: 实现跨平台图片下载 (处理 Referer 和反爬)

### 中期目标 (Next 2 Weeks)
7. ⏳ **Firecrawl 集成**: 添加 Firecrawl API 支持 (高质量抓取)
8. ⏳ **批量抓取**: 支持一次输入多个 URL
9. ⏳ **内容去重**: 基于 URL 的重复检测

---

## 六、用户反馈与踩坑记录 (Learnings)

### 已发现的问题
1. **GitHub Token 权限**: 需要 `contents:write` 权限才能推送文件
2. **CORS 限制**: 浏览器端无法直接抓取大多数网站 (必须用 Jina 等代理)
3. **微信长链接**: 带 `__biz` 参数的长链接易触发验证，优先使用短链接 `/s/xxxxx`

### 关键提示词 (Prompts)

**AI 优化提示词要求**:
```
你是个人知识管理助手。任务：
1. 提炼 20 字以内标题
2. 如果输入含 URL，先用 Jina 读取全文，再提取核心观点
3. 必须在 content 末尾保留: "\n\n原文链接: {URL}"
4. 识别内容方向 (AI/提效工具/个人成长/投资/创业/金句/生活/商业模式)
5. 返回纯 JSON: {title, content, direction}
```

---

## 七、参考资源

### 相关文件路径
- **Life-OS 项目**: `/Users/a2222/Downloads/life-os-main/`
- **Obsidian 笔记库**: `/Users/a2222/Documents/qukuaiqiji/my-note/`
- **协作目录**: `/Users/a2222/Documents/qukuaiqiji/my-note/AI协作/`
- **数字分身档案**: `/Users/a2222/Documents/qukuaiqiji/my-note/My-Digital-Self/`

### 参考项目
- **url-reader**: `https://github.com/yhslgg-arch/url-reader` (Python 抓取工具)
- **Jina AI**: `https://r.jina.ai/` (免费 Markdown 提取服务)
- **Firecrawl**: `https://www.firecrawl.dev/` (AI 驱动抓取 API)

### 当前系统状态
- **技能数量**: 11 个 (含 video-gen, Humanizer-zh, excalidraw-diagram 等)
- **Life-OS 版本**: v2.1 (GitHub 同步版)
- **数字分身版本**: v2.1 (系统化内容生产)
- **服务状态**: 运行中 `http://localhost:5173/`

---

## 八、MCP URL-Reader 技能 (已创建)

**路径**: `~/.claude/skills/mcp-url-reader/`

### 文件清单
- `SKILL.md` - 技能说明
- `url_reader.py` - 主程序 (19KB，完整抓取逻辑)
- `requirements.txt` - Python依赖
- `config.json` - 配置文件
- `README.md` - 使用指南

### 核心功能
- ✅ 三层抓取: Firecrawl → Jina → Playwright
- ✅ 平台识别: 微信/小红书/知乎/抖音/B站/Twitter
- ✅ 图片下载: 自动处理 Referer
- ✅ Markdown 生成: 标准格式，元数据完整

### 快速使用
```bash
# 安装依赖
pip install -r ~/.claude/skills/mcp-url-reader/requirements.txt

# 抓取并保存
python ~/.claude/skills/mcp-url-reader/url_reader.py https://example.com --save
```

---

**目标总结**: 实现"随手转发链接→自动抓取全文→AI 提炼→Obsidian 素材库"的完整闭环，让小鲸的内容采集效率提升 10 倍。
