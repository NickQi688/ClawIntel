# Kimi 2.5 API 集成指南

阿里百炼 Kimi 2.5 (moonshot-v1-auto) API 集成到 ClawIntel 项目。

## 📦 安装配置

### 1. 获取 API Key

访问 [阿里百炼控制台](https://bailian.console.aliyun.com/) 获取 API Key

### 2. 配置环境变量

编辑 `.env` 文件，添加：

```bash
KIMI_API_KEY=sk-your-actual-api-key
KIMI_API_BASE=https://dashscope.aliyuncs.com/compatible-mode/v1
KIMI_MODEL=moonshot-v1-auto
```

### 3. 运行测试

```bash
cd skills/crypto-api
node test-kimi.mjs
```

## 🚀 使用方法

### 基础对话

```javascript
import { KimiAPI } from './skills/crypto-api/kimi-api.mjs';

const response = await KimiAPI.chat({
  messages: [
    { role: 'user', content: '你好' }
  ]
});

console.log(response.choices[0].message.content);
```

### 简单问答

```javascript
const answer = await KimiAPI.ask(
  '分析 BTC 走势',
  '你是一个专业币圈分析师'
);

console.log(answer);
```

### 币圈分析

```javascript
const newsData = [
  { title: 'BTC 突破 90000 USD' },
  { title: '以太坊升级成功' }
];

const analysis = await KimiAPI.analyzeCrypto(
  '现在适合入场吗？',
  newsData
);

console.log(analysis);
```

### 流式输出

```javascript
await KimiAPI.chatStream({
  messages: [
    { role: 'user', content: '讲个故事' }
  ]
}, (chunk) => {
  process.stdout.write(chunk);
});
```

## 🔧 API 参考

### KimiAPI.chat(options)

调用 Kimi 对话接口

**参数：**
- `messages` - 对话消息数组
- `temperature` - 温度 (0-1，默认 0.7)
- `maxTokens` - 最大 token 数 (默认 2000)
- `stream` - 是否流式输出 (默认 false)

**返回：**
```javascript
{
  choices: [{
    message: {
      role: 'assistant',
      content: '回复内容'
    }
  }]
}
```

### KimiAPI.ask(question, context)

简单问答接口

**参数：**
- `question` - 问题文本
- `context` - 系统提示词（可选）

**返回：**
- 回复文本字符串

### KimiAPI.analyzeCrypto(query, newsData)

币圈专用分析接口

**参数：**
- `query` - 分析问题
- `newsData` - 资讯数据数组（可选）

**返回：**
- 分析结果文本

### KimiAPI.chatStream(options, onChunk)

流式对话接口

**参数：**
- `options` - 同 chat()
- `onChunk` - 内容块回调函数

## 💡 使用场景

### 1. 币圈资讯分析

```javascript
import { OpenNews6551 } from './6551-api.mjs';
import { KimiAPI } from './kimi-api.mjs';

// 获取最新资讯
const news = await OpenNews6551.search({
  keyword: 'BTC',
  limit: 10
});

// Kimi 分析
const analysis = await KimiAPI.analyzeCrypto(
  '分析 BTC 当前趋势和未来走势',
  news.data
);

console.log(analysis);
```

### 2. Twitter 情绪分析

```javascript
import { OpenTwitter6551 } from './6551-api.mjs';
import { KimiAPI } from './kimi-api.mjs';

const tweets = await OpenTwitter6551.search({
  keyword: 'BTC',
  limit: 50
});

const sentiment = await KimiAPI.ask(
  `分析以下 ${tweets.data.length} 条推文的情绪:\n` +
  tweets.data.map(t => t.text).join('\n')
);

console.log(sentiment);
```

### 3. 自动报告生成

```javascript
const report = await KimiAPI.chat({
  messages: [
    {
      role: 'system',
      content: '你是一个专业的币圈分析师，擅长撰写日报'
    },
    {
      role: 'user',
      content: '基于今日市场数据生成币圈日报'
    }
  ],
  temperature: 0.7,
  maxTokens: 3000
});

console.log(report.choices[0].message.content);
```

## 📊 模型对比

| 特性 | Kimi 2.5 | GPT-4 | Grok |
|------|----------|-------|------|
| 上下文长度 | 200k | 128k | 128k |
| 中文支持 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 币圈知识 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 价格 | 💰 中等 | 💰💰 高 | 💰💰💰 很高 |
| 速度 | 🚀 快 | 🚀 快 | 🚀🚀 很快 |

## 🔍 常见问题

**Q: API 调用失败？**
- 检查 .env 文件中的 API Key 是否正确
- 确认阿里百炼账户有足够余额
- 检查网络连接

**Q: 响应速度慢？**
- 减小 maxTokens 参数
- 使用流式接口 (chatStream)
- 检查网络延迟

**Q: 如何升级模型？**
- 修改 .env 中的 KIMI_MODEL
- 可选: `qwen-max`, `qwen-plus`, `qwen-turbo`

## 📞 技术支持

- 阿里百炼文档: https://help.aliyun.com/zh/dashscope/
- Kimi 官网: https://www.moonshot.cn/
- ClawIntel 项目: https://github.com/NickQi688/ClawIntel

---

创建时间: 2026-02-28
版本: v1.0.0
