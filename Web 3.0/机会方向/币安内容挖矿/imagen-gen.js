#!/usr/bin/env node

/**
 * Google Cloud Vertex AI Imagen Client
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const config = {
  projectId: 'gen-lang-client-0702921475',
  location: 'us-central1',
  apiKey: 'AIzaSyDBiq7whxirwEXvAGymqEE86imxrGATAik'
};

const downloadsDir = path.join(os.homedir(), 'Downloads');

async function generateImage(prompt) {
  const endpoint = `https://${config.location}-aiplatform.googleapis.com/v1/projects/${config.projectId}/locations/${config.location}/publishers/google/models/imagen-3.0-generate-001:predictLarge`;

  const requestBody = JSON.stringify({
    instances: [
      {
        prompt: prompt
      }
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: 'ASPECT_RATIO_3_4',
      language: 'auto'
    }
  });

  return new Promise((resolve, reject) => {
    const url = new URL(endpoint);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.predictions) {
            const base64Data = response.predictions[0].bytesBase64Encoded;
            resolve(base64Data);
          } else if (response.error) {
            reject(new Error(response.error.message || JSON.stringify(response.error)));
          } else {
            reject(new Error('Invalid response: ' + data.substring(0, 500)));
          }
        } catch (error) {
          reject(new Error(`Failed to parse: ${error.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

async function main() {
  const prompt = process.argv[2] || 'A beautiful landscape';

  try {
    console.log('正在调用 Google Imagen API...\n');
    console.log(`Prompt: ${prompt}\n`);

    const base64Data = await generateImage(prompt);

    const filename = path.join(downloadsDir, `imagen_${Date.now()}.png`);
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filename, buffer);

    console.log(`生成成功！已保存: ${filename}`);
  } catch (error) {
    console.error('生成失败:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
