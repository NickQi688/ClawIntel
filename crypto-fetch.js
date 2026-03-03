/**
 * 获取 6551 币圈资讯
 */
import https from 'https';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env
const envPath = join(__dirname, 'clawinfo-main', '.env');
const envContent = readFileSync(envPath, 'utf-8');
const NEWS_TOKEN = envContent.match(/NEWS_6551_TOKEN=(.+)/)?.[1] || '';

// Make API request
const options = {
  hostname: 'ai.6551.io',
  path: '/open/news_search',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${NEWS_TOKEN}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const result = JSON.parse(data);

    if (result.success && result.data) {
      const news = result.data.filter(n => n.aiRating?.score >= 70).slice(0, 20);

      console.log('# 📰 6551 币圈资讯 - AI评分筛选 (过去4小时)\n');

      const groups = {};
      news.forEach(n => {
        const type = n.engineType || 'news';
        if (!groups[type]) groups[type] = [];
        groups[type].push(n);
      });

      const icons = { news: '📰', listing: '🚀', onchain: '⛓️', meme: '🐸', market: '📊' };

      for (const [type, items] of Object.entries(groups)) {
        console.log(`## ${icons[type] || '📄'} ${type.toUpperCase()}\n`);
        items.forEach((n) => {
          console.log(`### ${n.aiRating?.score >= 80 ? '⭐ ' : ''}${n.text}\n`);
          console.log(`- 📊 **评分**: ${n.aiRating?.score}/100 (${n.aiRating?.grade}) | ${n.aiRating?.signal}`);
          console.log(`- 📰 **来源**: ${n.newsType}`);
          if (n.coins?.length) {
            console.log(`- 💰 **币种**: ${n.coins.map(c => c.symbol).join(', ')}`);
          }
          console.log(`- 🕐 **时间**: ${new Date(n.ts).toLocaleString('zh-CN')}`);
          if (n.aiRating?.summary || n.aiRating?.enSummary) {
            console.log(`- 📝 **摘要**: ${n.aiRating?.summary || n.aiRating?.enSummary}`);
          }
          if (n.link) console.log(`- 🔗 **链接**: ${n.link}`);
          console.log();
        });
      }

      console.log(`\n📊 剩余额度: ${result.quota}`);
    }
  });
});

req.on('error', (e) => console.error('请求失败:', e.message));
req.write(JSON.stringify({ limit: 30, page: 1 }));
req.end();
