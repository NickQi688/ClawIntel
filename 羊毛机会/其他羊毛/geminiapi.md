export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 1. 将你的子域名替换为 Google AI Studio 的官方 API 域名
    url.host = 'generativelanguage.googleapis.com';
    
    // 2. 构造新的请求
    const modifiedRequest = new Request(url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual'
    });

    try {
      // 3. 转发到 Google 并返回结果
      const response = await fetch(modifiedRequest);
      
      // 4. 为了确保在 VS Code 插件中不报错，添加 CORS 跨域支持（可选）
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Access-Control-Allow-Origin', '*');
      newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      newHeaders.set('Access-Control-Allow-Headers', '*');
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    } catch (e) {
      return new Response('Worker Proxy Error: ' + e.message, { status: 500 });
    }
  },
};