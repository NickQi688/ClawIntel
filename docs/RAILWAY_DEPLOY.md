# Railway 部署指南

## 🚀 5 分钟快速部署

### 步骤 1: 推送代码到 GitHub

确保代码已推送到：
```
https://github.com/NickQi688/ClawIntel
```

### 步骤 2: 登录 Railway

1. 访问 https://railway.app/
2. 点击 **"Login"** → 选择 **GitHub** 登录
3. 授权 Railway 访问您的 GitHub 仓库

### 步骤 3: 创建新项目

1. 点击 **"New Project"**
2. 选择 **"Deploy from GitHub repo"**
3. 搜索并选择 `ClawIntel` 仓库
4. 点击 **"Deploy Now"**

### 步骤 4: 等待部署

Railway 会自动：
- 检测 Node.js 项目
- 安装依赖（`npm install`）
- 启动服务（`npm start`）
- 分配一个公网 URL

部署时间约 2-3 分钟。

### 步骤 5: 获取后端 URL

部署成功后，Railway 会显示一个 URL，例如：
```
https://clawintel-production.up.railway.app
```

这是您的后端 API 地址。

### 步骤 6: 配置前端

修改 `web/index.html` 中的 API 地址：

```javascript
// 找到这行（约 469 行）
if (p.startsWith('/staging/clawintel')) return '/staging/clawintel/api';

// 改为
const API_BASE = 'https://clawintel-production.up.railway.app';
return API_BASE + '/api';
```

或者，更简单的方式：修改 `vercel.json` 的 rewrites 配置。

---

## 🌐 部署前端到 Vercel

### 步骤 1: 安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2: 登录并部署

```bash
cd /path/to/clawintel
vercel login
vercel --prod
```

### 步骤 3: 配置环境变量（可选）

如果需要连接后端，在 Vercel 项目设置中添加：
- Name: `NEXT_PUBLIC_API_URL`
- Value: `https://clawintel-production.up.railway.app`

---

## 📊 监控和日志

### 查看日志

Railway Dashboard → 选择项目 → "Metrics" → "Logs"

### 查看资源使用

Railway Dashboard → 选择项目 → "Metrics" → "CPU", "Memory"

---

## 💰 成本说明

| 方案 | 价格 | 说明 |
|------|------|------|
| **免费试用** | $5 赠送额度 | 新用户赠送 $5 |
| **按量付费** | 从 $5/月起 | 用多少付多少 |
| **免费层** | 有限免费 | 部分功能限制 |

Railway 采用按秒计费，个人项目通常免费额度够用。

---

## 🔄 更新部署

每次推送到 GitHub main 分支，Railway 会自动重新部署。

或者手动触发：
Railway Dashboard → 项目 → "New Deploy"

---

## ⚠️ 常见问题

### 1. better-sqlite3 编译失败

Railway 的 Nixpacks 会自动处理原生模块编译。

### 2. 端口问题

Railway 自动注入 `PORT` 环境变量，代码已兼容。

### 3. 数据持久化

Railway 的磁盘是临时的，需要配置卷持久化：
- Settings → "Volumes" → "New Volume"
- 挂载到 `/data` 目录

---

## 🎯 下一步

1. 部署到 Railway
2. 获取后端 URL
3. 部署前端到 Vercel
4. 配置域名（可选）

完成！
