# Life-OS Obsidian 版本优化方案

**目标**: 优化Obsidian体验，实现智能分类和命名

---

## 📋 核心优化需求

### 1️⃣ 文件命名优化
**当前**: `2026-02-07-1738892345678.md` ❌
**目标**: `AI驱动的个人工作流_2026-02-07.md` ✅

**实现**:
```javascript
// 清理文件名，移除非法字符
const sanitizeFilename = (title) => {
  return title
    .replace(/[<>:"/\\|?*]/g, '')  // 移除Windows非法字符
    .replace(/\s+/g, '_')           // 空格替换为下划线
    .substring(0, 50);              // 限制长度
};

// 生成文件名
const fileName = `${sanitizeFilename(data.title)}_${dateStr}.md`;
```

### 2️⃣ 按类型分目录存储

```
Obsidian仓库/
├── 01-碎片想法/          # 灵感
├── 02-待办任务/          # 任务
│   ├── 今日/            # 今日任务
│   ├── 本周/            # 本周任务
│   └── 长期/            # 长期任务
├── 03-知识库/            # 笔记
└── 04-日记/             # 日记
    └── 2026/
        └── 02/
```

**实现**:
```javascript
const getPathByType = (data, dateStr) => {
  const typeMap = {
    '灵感': '01-碎片想法',
    '任务': '02-待办任务',
    '笔记': '03-知识库',
    '日记': `04-日记/${dateStr.substring(0, 4)}/${dateStr.substring(5, 7)}`
  };

  const basePath = typeMap[data.type] || '01-碎片想法';

  // 任务特殊处理
  if (data.type === '任务' && data.dueDate) {
    const dueDate = new Date(data.dueDate);
    const today = new Date();
    const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return `${basePath}/今日`;
    if (diffDays <= 7) return `${basePath}/本周`;
    return `${basePath}/长期`;
  }

  return basePath;
};
```

### 3️⃣ 自动打标签

**规则**:
```javascript
const autoTags = {
  keywords: {
    'AI': ['#AI', '#LLM', '#人工智能'],
    '创业': ['#创业', '#商业', '#副业'],
    '投资': ['#投资', '#理财', '#股票'],
    '工具': ['#工具', '#效率', '#软件'],
    '个人成长': ['#成长', '#学习', '#提升']
  },
  platforms: {
    'Twitter/X': '#Twitter',
    '微信公众号': '#微信',
    '小红书': '#小红书',
    '知乎': '#知乎'
  }
};

// AI自动提取标签
const extractTags = (content, direction, platform) => {
  const tags = [];

  // 1. 基于内容方向
  if (autoTags.keywords[direction]) {
    tags.push(...autoTags.keywords[direction]);
  }

  // 2. 基于平台
  if (platform && platform !== '网页' && autoTags.platforms[platform]) {
    tags.push(autoTags.platforms[platform]);
  }

  // 3. 从URL提取
  const urlMatch = content.match(/https?:\/\/([^\s/]+)/);
  if (urlMatch) {
    const domain = urlMatch[1].replace('www.', '');
    tags.push(`#${domain}`);
  }

  return [...new Set(tags)]; // 去重
};
```

### 4️⃣ 模板任务系统

**今日任务模板**:
```javascript
const dailyTemplates = {
  '工作日': [
    { title: '检查邮件和消息', priority: '高', estimatedTime: 15 },
    { title: '列出今日最重要的3件事', priority: '紧急', estimatedTime: 10 },
    { title: '团队站会', priority: '普通', estimatedTime: 30 }
  ],
  '周末': [
    { title: '本周复盘', priority: '普通', estimatedTime: 30 },
    { title: '下周计划', priority: '普通', estimatedTime: 30 },
    { title: '学习充电', priority: '低', estimatedTime: 60 }
  ]
};

// 根据日期自动添加
const getDailyTemplateTasks = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  return isWeekend ? dailyTemplates['周末'] : dailyTemplates['工作日'];
};
```

### 5️⃣ 收件箱优化

**新的收件箱功能**:
- 📥 显示所有未分类内容（状态=inbox）
- 🔄 一键转换为任务/笔记
- 🏷️ 快速添加标签
- 📊 批量操作

---

## 🔧 GitHubStorageService 优化代码

### 完整实现

```javascript
async addRecord(data) {
  const config = this.getConfig();
  const { token, repo, branch = 'main', basePath = '' } = config;

  // 1. 准备日期
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  // 2. 清理文件名
  const sanitizedTitle = this.sanitizeFilename(data.title || '无标题');

  // 3. 根据类型确定目录
  const typePath = this.getPathByType(data, dateStr);

  // 4. 生成完整路径
  const fileName = `${sanitizedTitle}_${dateStr}.md`;
  const fullPath = `${basePath}/${typePath}/${fileName}`.replace(/\/+/g, '/');

  // 5. 自动提取标签
  const tags = this.extractTags(data);

  // 6. 构造Markdown内容
  const markdownContent = `---
title: "${data.title || '无标题'}"
date: ${dateStr}
type: "${data.type || '灵感'}"
source: "${data.source || 'Life-OS'}"
status: "${this.mapStatus(data.status) || 'inbox'}"
${data.direction ? `direction: "${data.direction}"` : ''}
${data.url ? `url: "${data.url}"` : ''}
${data.dueDate ? `dueDate: "${data.dueDate}"` : ''}
${tags.length > 0 ? `tags: [${tags.map(t => `"${t}"`).join(', ')}]` : ''}
---

${data.content || ''}

---
*Generated by Life-OS at ${now.toLocaleString()}*
${data.url ? `\n原文链接: ${data.url}\n` : ''}
`;

  // 7. 检查内容大小
  const contentSize = new Blob([markdownContent]).size;
  if (contentSize > 1024 * 1024) {
    throw new Error(`内容过大 (${(contentSize / 1024).toFixed(0)}KB)`);
  }

  // 8. Base64编码
  const contentBase64 = btoa(unescape(encodeURIComponent(markdownContent)));

  // 9. 推送到GitHub（带重试）
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo}/contents/${fullPath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Add ${data.type}: ${data.title}`,
            content: contentBase64,
            branch: branch
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        this.handleError(response.status, error);
      }

      return await response.json();

    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// 辅助方法
sanitizeFilename(title) {
  return title
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9_\-]/g, '')
    .substring(0, 50);
}

getPathByType(data, dateStr) {
  const typeMap = {
    '灵感': '01-碎片想法',
    '任务': '02-待办任务',
    '笔记': '03-知识库',
    '日记': `04-日记/${dateStr.substring(0, 4)}/${dateStr.substring(5, 7)}`
  };

  const basePath = typeMap[data.type] || '01-碎片想法';

  if (data.type === '任务' && data.dueDate) {
    const dueDate = new Date(data.dueDate);
    const today = new Date();
    const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return `${basePath}/今日`;
    if (diffDays <= 7) return `${basePath}/本周`;
    return `${basePath}/长期`;
  }

  return basePath;
}

extractTags(data) {
  const tags = [];

  // 1. 基于方向
  const directionTags = {
    'AI': '#AI',
    '创业': '#创业',
    '投资': '#投资',
    '个人成长': '#成长',
    '工具': '#工具'
  };
  if (directionTags[data.direction]) {
    tags.push(directionTags[data.direction]);
  }

  // 2. 基于URL
  if (data.url) {
    if (data.url.includes('x.com') || data.url.includes('twitter')) {
      tags.push('#Twitter');
    } else if (data.url.includes('mp.weixin.qq.com')) {
      tags.push('#微信');
    } else if (data.url.includes('zhihu.com')) {
      tags.push('#知乎');
    }
  }

  return [...new Set(tags)];
}

handleError(status, error) {
  if (status === 401) {
    throw new Error("GitHub Token 无效");
  } else if (status === 403) {
    throw new Error("权限不足或请求超限");
  } else if (status === 404) {
    throw new Error("仓库或路径不存在");
  } else {
    throw new Error(`GitHub Error: ${error.message}`);
  }
}
```

---

## 📁 Obsidian目录结构示例

```
my-note/
├── 01-碎片想法/
│   ├── AI驱动的个人工作流_2026-02-07.md
│   └── 微信公众号文章_2026-02-07.md
│
├── 02-待办任务/
│   ├── 今日/
│   │   ├── 完成Life-OS改造_2026-02-07.md
│   │   └── 测试URL抓取_2026-02-07.md
│   ├── 本周/
│   │   └── 准备周会汇报_2026-02-07.md
│   └── 长期/
│       └── 学习Python_2026-02-07.md
│
├── 03-知识库/
│   └── Obsidian使用技巧_2026-02-07.md
│
└── 04-日记/
    └── 2026/
        └── 02/
            └── 2026-02-07.md
```

---

## 🎯 实施步骤

### Step 1: 优化 GitHubStorageService
- [ ] 添加文件名清理
- [ ] 按类型分目录
- [ ] 自动标签提取

### Step 2: 添加配置选项
- [ ] 设置中添加"基础路径"配置
- [ ] 设置中添加"目录结构"配置

### Step 3: 实现模板任务
- [ ] 每日任务模板
- [ ] 自动添加机制

### Step 4: 优化收件箱
- [ ] 支持批量转换类型
- [ ] 快速添加标签
- [ ] 批量删除

---

## ⏱️ 预计时间

- 优化 GitHubStorageService: 20分钟
- 测试验证: 10分钟
- 总计: 30分钟

---

**确认后我立即开始优化！**
