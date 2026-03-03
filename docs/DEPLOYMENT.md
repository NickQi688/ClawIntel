# Vercel 部署指南

## 方案选择

### 方案 A: 前端部署到 Vercel（快速开始）

**适用场景**：先展示前端界面，后端 API 暂时使用其他服务

#### 步骤 1: 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 步骤 2: 登录 Vercel

```bash
vercel login
```

#### 步骤 3: 部署前端

```bash
cd /path/to/clawintel
vercel --prod
```

#### 步骤 4: 配置环境变量

在 Vercel Dashboard 设置：
- 项目 Settings → Environment Variables
- 暂时不需要设置（前端只读模式）

#### 步骤 5: 访问

Vercel 会分配一个域名：`https://clawintel.vercel.app`

---

### 方案 B: 后端 API 部署到 Railway（推荐）

Railway 支持 Node.js + SQLite，最接近原项目架构。

#### 步骤 1: 注册 Railway

访问 https://railway.app/

#### 步骤 2: 创建新项目

1. 点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择 `NickQi688/ClawIntel`

#### 步骤 3: 配置环境变量

Railway 会自动添加：
```
DIGEST_PORT=8767
```

手动添加：
```
NODE_ENV=production
```

#### 步骤 4: 获取后端 URL

Railway 会分配一个 URL，例如：
`https://clawintel-production.up.railway.app`

#### 步骤 5: 更新 Vercel 前端配置

修改 `vercel.json`：

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://clawintel-production.up.railway.app/api/:path*"
    },
    {
      "source": "/feed/:path*",
      "destination": "https://clawintel-production.up.railway.app/feed/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/web/index.html"
    }
  ]
}
```

重新部署 Vercel：
```bash
vercel --prod
```

---

### 方案 C: 全部部署到 Vercel（需要重构）

如果您想全部使用 Vercel，需要：

1. **重写后端为 Vercel API Routes**
2. **替换 SQLite 为 Vercel Postgres**
3. **移除持久连接（Serverless 限制）**

这需要较大改动，建议先使用方案 A+B。

---

## 域名配置

### Vercel 自定义域名

1. 进入 Vercel 项目 Settings → Domains
2. 添加您的域名（例如：`clawintel.yourdomain.com`）
3. Vercel 会显示需要添加的 DNS 记录：

| 类型 | 名称 | 值 |
|------|------|-----|
| CNAME | clawinfo | cname.vercel-dns.com |

4. 在阿里云 DNS 添加上述记录

---

## 成本对比

| 平台 | 免费额度 | 超出费用 |
|------|---------|---------|
| **Vercel** | 100GB 带宽/月 | $20/100GB |
| **Railway** | $5 免费额度/月 | 按使用量计费 |
| **Render** | 750小时/月 | 免费 |
| **Fly.io** | 3个小应用 | 按使用量计费 |

推荐：**Vercel（前端）+ Railway（后端）**

---

## 下一步

1. 先部署前端到 Vercel
2. 后端 API 暂时可以用 Mock 数据测试界面
3. 确认前端正常后，再部署后端到 Railway

需要我帮您生成 Mock 数据的前端版本吗？
