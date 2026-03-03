#!/bin/bash

# 获取 6551 币圈资讯

NEWS_TOKEN=$(grep "NEWS_6551_TOKEN=" .env | cut -d'=' -f2)

curl -s -X POST "https://ai.6551.io/open/news_search" \
  -H "Authorization: Bearer $NEWS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"limit": 30, "page": 1}' > /tmp/news.json

node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/news.json', 'utf-8'));

if (data.success && data.data) {
  const news = data.data.filter(n => n.aiRating?.score >= 70).slice(0, 20);

  console.log('# 📰 6551 币圈资讯 - AI评分筛选 (过去4小时)\\n');

  const groups = {};
  news.forEach(n => {
    const type = n.engineType || 'news';
    if (!groups[type]) groups[type] = [];
    groups[type].push(n);
  });

  const icons = { news: '📰', listing: '🚀', onchain: '⛓️', meme: '🐸', market: '📊' };

  for (const [type, items] of Object.entries(groups)) {
    console.log('## ' + (icons[type] || '📄') + ' ' + type.toUpperCase() + '\\n');
    items.forEach((n, i) => {
      console.log('### ' + (n.aiRating?.score >= 80 ? '⭐ ' : '') + n.text);
      console.log();
      console.log('- 📊 **评分**: ' + n.aiRating?.score + '/100 (' + n.aiRating?.grade + ') | ' + n.aiRating?.signal);
      console.log('- 📰 **来源**: ' + n.newsType);
      if (n.coins && n.coins.length > 0) {
        console.log('- 💰 **币种**: ' + n.coins.map(c => c.symbol).join(', '));
      }
      console.log('- 🕐 **时间**: ' + new Date(n.ts).toLocaleString('zh-CN'));
      if (n.aiRating?.summary || n.aiRating?.enSummary) {
        console.log('- 📝 **摘要**: ' + (n.aiRating?.summary || n.aiRating?.enSummary));
      }
      if (n.link) {
        console.log('- 🔗 **链接**: ' + n.link);
      }
      console.log();
    });
  }

  console.log('\\n📊 剩余额度: ' + data.quota);
} else {
  console.error('Error:', data);
}
"
