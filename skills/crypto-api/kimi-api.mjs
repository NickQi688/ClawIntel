/**
 * 阿里百炼 Kimi 2.5 API 客户端
 * 用于 ClawIntel 项目的 AI 分析和对话
 */

// 阿里百炼 API 配置
const KIMI_CONFIG = {
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  model: 'moonshot-v1-auto', // Kimi 2.5
  timeout: 60000
};

/**
 * 加载环境变量
 */
function loadEnv() {
  try {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(process.cwd(), '.env');

    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      return envContent.split('\n').reduce((acc, line) => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          acc[key.trim()] = valueParts.join('=').trim();
        }
        return acc;
      }, {});
    }
  } catch (error) {
    console.error('加载 .env 文件失败:', error.message);
  }
  return {};
}

/**
 * 获取 Kimi API Key
 */
function getApiKey() {
  const env = loadEnv();
  return env.KIMI_API_KEY || env.DASHSCOPE_API_KEY;
}

/**
 * 调用 Kimi Chat Completion API
 */
async function chat(options = {}) {
  const {
    messages = [],
    temperature = 0.7,
    maxTokens = 2000,
    stream = false
  } = options;

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('KIMI_API_KEY not configured in .env file');
  }

  try {
    const response = await fetch(`${KIMI_CONFIG.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: KIMI_CONFIG.model,
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens,
        stream: stream
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Kimi API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Kimi API 调用失败:', error.message);
    throw error;
  }
}

/**
 * 流式调用 Kimi API
 */
async function chatStream(options = {}, onChunk) {
  const {
    messages = [],
    temperature = 0.7,
    maxTokens = 2000
  } = options;

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('KIMI_API_KEY not configured');
  }

  try {
    const response = await fetch(`${KIMI_CONFIG.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: KIMI_CONFIG.model,
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens,
        stream: true
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Kimi API error: ${response.status} - ${error}`);
    }

    // 处理流式响应
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content && onChunk) {
              onChunk(content);
            }
          } catch (e) {
            // 忽略解析错误
          }
        }
      }
    }
  } catch (error) {
    console.error('Kimi Stream API 调用失败:', error.message);
    throw error;
  }
}

/**
 * 简单的问答接口
 */
async function ask(question, context = '') {
  const messages = [];

  if (context) {
    messages.push({
      role: 'system',
      content: context
    });
  }

  messages.push({
    role: 'user',
    content: question
  });

  const response = await chat({ messages });
  return response.choices?.[0]?.message?.content || '';
}

/**
 * 币圈分析接口
 */
async function analyzeCrypto(query, newsData = []) {
  const systemPrompt = `你是一个专业的币圈分析师，具有深厚的市场洞察力和技术分析能力。

分析原则：
1. 结合市场数据和项目基本面
2. 识别潜在机会和风险
3. 给出明确的操作建议（做多/做空/观望）
4. 用数据支撑你的观点`;

  const newsContext = newsData.length > 0
    ? `\n\n最新资讯：\n${newsData.map(n => `- ${n.title}`).join('\n')}`
    : '';

  const messages = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: query + newsContext
    }
  ];

  const response = await chat({
    messages,
    temperature: 0.7,
    maxTokens: 3000
  });

  return response.choices?.[0]?.message?.content || '';
}

// 导出 API 接口
export const KimiAPI = {
  chat,
  chatStream,
  ask,
  analyzeCrypto,
  config: KIMI_CONFIG
};

export default KimiAPI;
