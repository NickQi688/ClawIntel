# ClawIntel - 6551 API 集成测试

## 📝 已完成的集成

### 1. 新增文件

- **`src/6551-api.mjs`** - 6551 API 调用封装
  - `OpenNews6551` - OpenNews API 接口
  - `OpenTwitter6551` - OpenTwitter API 接口
  - `fetch6551CryptoNews()` - 获取币圈新闻
  - `fetch6551TwitterTweets()` - 获取热门推文

### 2. 更新文件

- **`src/crypto-sources.mjs`** - 添加 6551 数据源类型定义
  - `SOURCE_TYPES['6551_news']`
  - `SOURCE_TYPES['6551_twitter']`
  - `detect6551Source()` - 检测 6551 数据源

---

## 🔧 环境变量配置

在 ClawIntel 项目根目录的 `.env` 文件中添加：

```bash
# 6551 API 配置 (如果还没有)
NEWS_6551_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
TWITTER_6551_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **注意**: 这个 .env 文件在项目的 `币安内容挖矿/.env`，需要复制到 ClawIntel 项目根目录

---

## 🚀 使用方式

### 在 ClawIntel 中添加数据源

在 ClawIntel 界面中添加新的数据源，URL 格式：

1. **6551 News**: `6551:btc` (比特币新闻) 或 `6551:news` (所有新闻)
2. **6551 Twitter**: `6551:twitter` (热门加密推文)

### 代码调用示例

```javascript
// 获取 BTC 相关新闻
import { fetch6551CryptoNews } from './crypto-sources.mjs';

const news = await fetch6551CryptoNews({
  coin: 'BTC',
  minScore: 70,
  limit: 20
});

// 获取热门加密推文
import { fetch6551TwitterTweets } from './crypto-sources.mjs';

const tweets = await fetch6551TwitterTweets({
  keywords: 'crypto',
  minLikes: 1000,
  limit: 20
});
```

---

## 📊 数据对比

| 特性 | ClawIntel (Grok API) | 6551 API |
|------|----------------------|----------|
| **数据源** | Grok AI 生成 | 50+ 新闻源 + Twitter |
| **AI 评分** | ❌ 无 | ✅ 内置评分 |
| **成本** | 按 Token 计费 | 免费 10,000 次/天 |
| **实时性** | 生成需要时间 | 实时返回 |
| **数据结构** | 文本格式 | 结构化 JSON |

---

## 💡 推荐使用场景

### 使用 6551 API（推荐）
- ✅ 快速获取最新资讯
- ✅ 需要 AI 评分筛选
- ✅ 获取 Twitter 热门讨论
- ✅ 免费使用

### 使用 Grok API
- ✅ 需要 AI 深度分析
- ✅ 自定义数据源
- ✅ 需要特定格式输出

---

*更新日期: 2026-02-27*
