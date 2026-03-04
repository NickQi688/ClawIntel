# ClawFeed 部署任务

## 任务目标
在 Vercel 上部署 ClawFeed 项目,用于抓取推特博主和 RSS 订阅源的加密货币相关内容。

## 项目信息
- GitHub 仓库: https://github.com/kevinho/clawfeed
- 项目类型: Next.js 全栈应用
- 部署平台: Vercel (推荐)

## 部署步骤

### 1. 准备工作

```bash
# 确认已安装 Node.js (需要 18.x 或更高版本)
node --version

# 确认已安装 Git
git --version

# 确认已安装 pnpm (项目使用 pnpm)
npm install -g pnpm
```

### 2. Fork 并克隆仓库

```bash
# 访问 https://github.com/kevinho/clawfeed
# 点击右上角 Fork 按钮

# 克隆你 fork 的仓库
git clone https://github.com/[你的用户名]/clawfeed.git
cd clawfeed
```

### 3. 安装依赖

```bash
# 安装项目依赖
pnpm install
```

### 4. 环境变量配置

创建 `.env.local` 文件:

```bash
# 复制示例配置
cp .env.example .env.local

# 编辑 .env.local,添加以下必需的环境变量:
```

**必需的环境变量**:
```env
# 数据库配置 (Vercel 会自动提供)
DATABASE_URL=

# OAuth 配置 (用于 Twitter 登录)
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=

# GitHub Token (可选,用于 GitHub Trending)
GITHUB_TOKEN=

# 应用配置
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 5. 本地测试

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
# 确认应用正常运行
```

### 6. 部署到 Vercel

#### 方式 A: 通过 Vercel CLI (推荐)

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 按提示操作:
# 1. 选择链接到现有项目
# 2. 配置环境变量
# 3. 确认部署
```

#### 方式 B: 通过 Vercel 网站

1. 访问 https://vercel.com
2. 登录账号
3. 点击 "Add New Project"
4. 导入你的 GitHub 仓库 (你 fork 的 clawfeed)
5. 配置项目:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
6. 添加环境变量 (从 .env.local 复制)
7. 点击 "Deploy"

### 7. 配置自定义域名 (可选)

```bash
# 在 Vercel 项目设置中添加自定义域名
# 或者使用默认的 .vercel.app 域名
```

## 部署后配置

### 1. 添加推特博主列表

在部署后的应用中:
1. 登录账号
2. 进入 Feed 管理页面
3. 添加 Twitter Feed:
   - 类型: `twitter_feed`
   - 用户名: (添加博主列表,如: @web3a99, @WuBlockchain 等)

### 2. 添加深潮快讯 RSS

添加 RSS Feed:
- 类型: `rss`
- URL: `https://www.techflowpost.com/rss`
- 名称: 深潮快讯

### 3. 设置定时抓取

在应用设置中配置:
- 抓取频率: 每小时
- 抓取时间: 整点

## 验证部署

访问你的 Vercel 应用 URL,确认:
- ✅ 首页可以正常加载
- ✅ 可以登录账号
- ✅ 可以添加 Feed
- ✅ Feed 正常抓取内容

## 常见问题

### Q: pnpm install 失败
A: 确认已安装 pnpm: `npm install -g pnpm`

### Q: 环境变量配置错误
A: 检查 .env.local 文件格式,确保没有多余空格

### Q: Twitter API 调用失败
A: 需要申请 Twitter Developer Account,获取 API Key

### Q: 数据库连接失败
A: Vercel 部署时会自动配置 PostgreSQL,检查 DATABASE_URL

## 下一步

部署成功后,我需要:
1. 配置推特博主列表 (我会提供完整的博主列表)
2. 配置 RSS 订阅源
3. 设置定时任务
4. 测试内容抓取和展示

请告诉我部署完成后的应用 URL。
