#!/usr/bin/env node

/**
 * Pollinations.ai - Free Image Generation API
 * No API key required
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const downloadsDir = path.join(os.homedir(), 'Downloads');

async function generateImage(prompt, options = {}) {
  const { width = 768, height = 1024, seed = Date.now() } = options;

  // Pollinations.ai doesn't need API key
  const encodedPrompt = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&enhance=true`;

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    }).on('error', reject);
  });
}

async function main() {
  const prompt = process.argv[2] || 'A beautiful landscape';

  try {
    console.log('正在调用 Pollinations.ai API...\n');
    console.log(`Prompt: ${prompt}\n`);

    const imageBuffer = await generateImage(prompt, { width: 768, height: 1024 });

    const filename = path.join(downloadsDir, `crypto_infographic_${Date.now()}.png`);
    fs.writeFileSync(filename, imageBuffer);

    console.log(`生成成功！已保存: ${filename}`);
    console.log(`\n可以使用图片查看器打开查看`);
  } catch (error) {
    console.error('生成失败:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
