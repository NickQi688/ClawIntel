/**
 * 获取 6551 币圈资讯
 */
import https from 'https';
import { readFileSync } from 'fs';

const NEWS_TOKEN = readFileSync('.env', 'utf-8').match(/NEWS_6551_TOKEN=(.+)/)?.[1] || '';

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
      // 筛选并排序：优先显示高评分内容
      let news = result.data
        .filter(n => n.aiRating?.score >= 50 || n.engineType === 'market')
        .sort((a, b) => {
          // 优先按评分排序，然后按时间
          const scoreA = a.aiRating?.score || 0;
          const scoreB = b.aiRating?.score || 0;
          if (scoreA !== scoreB) return scoreB - scoreA;
          return new Date(b.ts) - new Date(a.ts);
        })
        .slice(0, 25);

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
          const score = n.aiRating?.score || 0;
          const star = score >= 80 ? '⭐ ' : (score >= 60 ? '🔸 ' : '');
          console.log(`### ${star}${n.text.replace(/<[^>]*>/g, '')}\n`);
          if (n.aiRating?.score) {
            console.log(`- 📊 **评分**: ${n.aiRating.score}/100 (${n.aiRating.grade}) | ${n.aiRating.signal}`);
          }
          console.log(`- 📰 **来源**: ${n.newsType || n.source}`);
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
req.write(JSON.stringify({ limit: 50, page: 1 }));
req.end();
