/**
 * 获取 6551 币圈资讯脚本
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env
function loadEnv() {
  try {
    const envPath = join(__dirname, '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const env = {};
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq > 0) env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
    }
    return env;
  } catch (error) {
    console.error('❌ 无法读取 .env 文件:', error.message);
    return {};
  }
}

// 设置环境变量
const env = loadEnv();
process.env.NEWS_6551_TOKEN = env.NEWS_6551_TOKEN || '';
process.env.TWITTER_6551_TOKEN = env.TWITTER_6551_TOKEN || '';
process.env.NEWS_6551_API_BASE = env.NEWS_6551_API_BASE || 'https://ai.6551.io';

// 导入 6551 API
import('./src/6551-api.mjs').then(async (m) => {
  try {
    console.log('📡 正在获取 6551 币圈资讯...\n');
    const result = await m.fetch6551CryptoNews({
      minScore: 70,
      limit: 25
    });
    console.log(result.content);
    console.log('\n📊 剩余额度:', result.quota);
  } catch (error) {
    console.error('❌ 获取失败:', error.message);
  }
});
