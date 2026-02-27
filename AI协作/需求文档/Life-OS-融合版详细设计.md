# Life-OS 融合版 v3.0 详细设计文档

**日期**: 2026-02-07
**目标**: 完整功能 + 多后端 + 优化交互

---

## 📁 完整文件结构

```
projects/life-os-main/
├── src/
│   ├── App.jsx ⭐ 融合版主文件
│   │
│   ├── services/
│   │   ├── StorageService.js ✅ 已创建
│   │   ├── GitHubStorageService.js ✅ 已创建
│   │   ├── StorageServiceFactory.js ✅ 已创建
│   │   ├── githubService.js (旧版，保留兼容)
│   │   └── optimizedFeishuService.js (飞书服务，待适配)
│   │
│   ├── components/
│   │   ├── OptimizedComponents.jsx (已有)
│   │   ├── ErrorBoundary.jsx (已有)
│   │   ├── Onboarding.jsx (已有)
│   │   ├── KeyboardShortcuts.jsx (已有)
│   │   ├── StatsChart.jsx (已有)
│   │   └── Skeleton.jsx (已有)
│   │
│   └── utils/
│       ├── hooks.js (已有)
│       ├── performance.js (已有)
│       └── optimizations.js (已有)
│
└── 配置文件...
```

---

## 🏗️ App.jsx 融合版结构

### 1️⃣ 导入部分（第1-40行）

```jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Send, Settings, CheckCircle, Inbox, Zap,
  LayoutDashboard, List, Smartphone, Monitor,
  Plus, Clock, Tag, X, LogOut, ChevronRight,
  Database, ArrowRight, CheckSquare, Calendar,
  Link as LinkIcon, Trash2, Play, Pause, RotateCcw, Maximize2,
  Lightbulb, AlignLeft, MoreHorizontal, CalendarClock,
  Shield, Activity, Layers, ArrowRightCircle, Key, Table,
  HelpCircle, AlertTriangle, Lock, RefreshCw, Eye, ChevronDown, ChevronUp,
  User, Mail, MessageCircle, Globe, Loader2, Info, AlertCircle, Check, FileText,
  Dices, Sliders, Book, PenTool, Hash, Layout, Search, Command, Flame, BookOpen,
  Edit3, MoreVertical, XCircle, ExternalLink, Sparkles, Wand2, Timer, Rocket, Download, BarChart3
} from 'lucide-react';

// === 新增：后端抽象层 ===
import { StorageServiceFactory } from './services/StorageServiceFactory.js';
import GitHubStorageService from './services/GitHubStorageService.js';

// === 原有导入 ===
import { useDebouncedValue, useKeyboard } from './utils/hooks.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import {
  OptimizedKanbanCard,
  OptimizedInboxCard,
  OptimizedTaskCard,
} from './components/OptimizedComponents.jsx';
import { useOnboarding, OnboardingTrigger } from './components/Onboarding.jsx';
import StatsChart from './components/StatsChart.jsx';
```

---

### 2️⃣ 常量和配置（第41-100行）

```jsx
// --- 配置链接 ---
const TUTORIAL_URL = "https://ai.feishu.cn/docx/IbF7dM1HuogviMxlfOOc1vOFn1d?from=from_copylink";
const TEMPLATE_URL = "https://ai.feishu.cn/base/CJQBbksPWaMfzlsatFPcFKWAnLd?from=from_copylink";

// --- 常量定义 ---
const STATUS = { INBOX: "收件箱", TODO: "待办", DOING: "进行中", DONE: "已完成" };
const TYPE = { IDEA: "灵感", TASK: "任务", NOTE: "笔记", JOURNAL: "日记" };
const PRIORITY = { HIGH: "紧急", NORMAL: "普通", LOW: "不急" };
const CONTENT_DIRECTIONS = ["AI", "提效工具", "个人成长", "投资", "新媒体", "创业", "工作", "金句", "生活", "学习", "其他"];

// === 新增：后端类型配置 ===
const BACKEND_TYPES = {
  GITHUB: 'github',
  FEISHU: 'feishu'
};
```

---

### 3️⃣ AI服务（第101-250行）

**关键改动**：保留Jina Reader优化

```jsx
class AiService {
  constructor() {
    this.STORAGE_KEY = 'lifeos_ai_config';
  }

  getConfig() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : { provider: 'gemini', model: 'google/gemini-2.0-flash-001' };
  }

  saveConfig(config) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
  }

  async optimize(titleInput, contentInput, type) {
    const config = this.getConfig();
    const apiKey = config.apiKey;
    if (!apiKey) throw new Error("请先在设置中配置 AI API Key");

    let finalContent = contentInput || "";
    let originalUrl = null;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const foundUrls = (titleInput + " " + (contentInput || "")).match(urlRegex);

    // ✅ 保留：Jina Reader 轻量抓取
    if (foundUrls && foundUrls.length > 0) {
      originalUrl = foundUrls[0];
      try {
        const jinaUrl = `https://r.jina.ai/${encodeURIComponent(originalUrl)}`;
        const jinaRes = await fetch(jinaUrl, {
          headers: {
            'Accept': 'text/markdown',
            'User-Agent': 'Life-OS/3.0'
          }
        });

        if (jinaRes.ok) {
          let fetchedMd = await jinaRes.text();

          // ✅ 保留：平台识别
          let platform = "网页";
          if (originalUrl.includes('mp.weixin.qq.com')) platform = "微信公众号";
          else if (originalUrl.includes('xiaohongshu.com') || originalUrl.includes('xhslink.com')) platform = "小红书";
          else if (originalUrl.includes('zhihu.com')) platform = "知乎";
          else if (originalUrl.includes('x.com') || originalUrl.includes('twitter.com')) platform = "Twitter/X";
          else if (originalUrl.includes('bilibili.com')) platform = "B站";
          else if (originalUrl.includes('douyin.com')) platform = "抖音";

          // ✅ 保留：内容长度调整
          let maxChars = 5000;
          if (platform === "微信公众号" || platform === "小红书") maxChars = 8000;
          else if (platform === "Twitter/X") maxChars = 3000;

          finalContent = `> [!info] 来源：${platform}
> ${originalUrl}

${fetchedMd.substring(0, maxChars)}${fetchedMd.length > maxChars ? '\n\n...(内容已截断，完整内容请查看原文)' : ''}

---
**原始输入**: ${contentInput || titleInput}`;
        }
      } catch (e) {
        console.warn("Jina fetch failed, falling back to basic AI optimization", e);
        if (originalUrl) {
          finalContent = `${finalContent}\n\n原文链接: ${originalUrl}`;
        }
      }
    }

    const fullText = `标题/摘要输入: ${titleInput || "无"}\n详细内容: ${finalContent}`;

    const systemPrompt = `你是一个个人知识管理助手。
你的任务是：
1. 提炼一个 20 字以内的概括性标题。
2. 如果是网页内容，请提取核心观点并按逻辑条理化。
3. 必须在返回的 content 末尾保留 "原文链接: [URL]" （如果输入中包含URL）。
4. 识别内容方向（从：AI, 提效工具, 个人成长, 投资, 新媒体, 创业, 工作, 金句, 生活, 学习, 其他 中选择）。

必须返回纯 JSON 格式：
{
  "title": "...",
  "content": "...",
  "direction": "..."
}`;

    const endpoint = config.provider === 'deepseek'
      ? 'https://api.deepseek.com/chat/completions'
      : 'https://openrouter.ai/api/v1/chat/completions';

    const model = config.model || (config.provider === 'deepseek' ? 'deepseek-chat' : 'google/gemini-2.0-flash-001');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://life-os.local',
          'X-Title': 'Life-OS'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: fullText }
          ]
        })
      });

      if (!response.ok) throw new Error(`AI 请求失败: ${response.status}`);

      const data = await response.json();
      const contentStr = data.choices[0].message.content;
      const result = JSON.parse(contentStr.replace(/```json/g, '').replace(/```/g, '').trim());

      // ✅ 保留：确保URL被保留
      if (originalUrl && !result.content.includes('原文链接')) {
        result.content += `\n\n---\n原文链接: ${originalUrl}`;
      }

      return result;
    } catch (error) {
      console.error("AI Error:", error);
      throw error;
    }
  }
}
const aiService = new AiService();

// === 新增：存储服务工厂实例 ===
let storageService = null;
```

---

### 4️⃣ 工具函数（第251-350行）

```jsx
// 问候语逻辑
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "深夜好，注意休息";
  if (hour < 9) return "早安，开启元气满满的一天";
  if (hour < 12) return "上午好，保持专注";
  if (hour < 14) return "午安，记得按时吃饭";
  if (hour < 18) return "下午好，继续加油";
  if (hour < 22) return "晚上好，享受闲暇时光";
  return "夜深了，早点休息";
};

// 图标辅助函数
const getTypeIcon = (type) => {
  switch (type) {
    case TYPE.TASK: return <CheckSquare size={14} className="text-indigo-400" />;
    case TYPE.NOTE: return <FileText size={14} className="text-emerald-400" />;
    case TYPE.JOURNAL: return <Book size={14} className="text-amber-400" />;
    default: return <Lightbulb size={14} className="text-blue-400" />;
  }
};

// 获取本地日期字符串
const getLocalDateString = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - offset);
  return localDate.toISOString().split('T')[0];
};

// 提取标签
const extractTags = (text) => {
  if (!text) return [];
  const regex = /#(\S+)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }
  return matches;
};
```

---

### 5️⃣ UI组件（第351-600行）

```jsx
const Logo = ({ className = "w-8 h-8", textSize = "text-xl", onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-2.5 ${onClick ? 'cursor-pointer' : ''}`}>
    <div className={`${className} bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30`}>
      <Zap size={20} fill="currentColor" className="drop-shadow-sm" />
    </div>
    <span className={`font-bold ${textSize} tracking-tight text-slate-100`}>Life<span className="text-indigo-400">OS</span></span>
  </div>
);

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-emerald-600/90 text-white',
    error: 'bg-red-500/90 text-white',
    info: 'bg-indigo-500/90 text-white'
  };

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl backdrop-blur-md transition-all animate-fade-in-down border border-white/10 ${bgColors[type] || bgColors.info}`}>
      {type === 'success' ? <Check size={18}/> : type === 'error' ? <AlertCircle size={18}/> : <Info size={18}/>}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

const Dialog = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in text-slate-200 flex flex-col max-h-[85vh]">
        <div className="px-6 py-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/30 shrink-0">
          <h3 className="font-bold text-slate-100">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};

// === 新增：后端选择器组件 ===
const BackendSelector = ({ currentBackend, onSelect }) => {
  const services = StorageServiceFactory.getAvailableServices();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-200">选择存储后端</h3>
      <div className="grid grid-cols-2 gap-4">
        {services.map(service => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`p-6 rounded-xl border-2 transition-all ${
              currentBackend === service.id
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="text-3xl mb-2">{service.icon}</div>
            <div className="font-medium text-slate-200">{service.name}</div>
            {service.requiresConfig && (
              <div className="text-xs text-slate-500 mt-2">需要配置</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
```

---

### 6️⃣ 设置页面（第601-750行）

**关键改动**：添加后端选择

```jsx
const SettingsScreen = ({ onSave, onCancel, initialConfig, notify, onLogout }) => {
  const [formData, setFormData] = useState({
    // === 新增：后端选择 ===
    backendType: initialConfig?.backendType || 'github',

    // GitHub配置
    githubToken: initialConfig?.githubToken || '',
    githubRepo: initialConfig?.githubRepo || '',
    githubBranch: initialConfig?.githubBranch || 'main',
    githubPath: initialConfig?.githubPath || '选题管理/00-碎片想法',

    // AI配置
    aiProvider: initialConfig?.aiProvider || 'gemini',
    aiModel: initialConfig?.aiModel || 'google/gemini-2.0-flash-001',
    aiKey: initialConfig?.aiKey || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 保存AI配置
    aiService.saveConfig({
      provider: formData.aiProvider,
      model: formData.aiModel,
      apiKey: formData.aiKey
    });

    // === 新增：保存后端配置 ===
    if (formData.backendType === 'github') {
      const githubService = StorageServiceFactory.createService('github');
      githubService.saveConfig({
        token: formData.githubToken,
        repo: formData.githubRepo,
        branch: formData.githubBranch,
        path: formData.githubPath
      });
    }

    onSave({
      backendType: formData.backendType,
      ...formData
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6 text-slate-200">
      <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-800 animate-scale-in">
        <div className="flex items-center gap-3 mb-8">
          <Logo />
          <div>
            <h2 className="text-2xl font-bold">Life-OS 设置</h2>
            <p className="text-sm text-slate-500">配置你的个人知识管理系统</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* === 新增：后端选择 === */}
          <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl">
            <BackendSelector
              currentBackend={formData.backendType}
              onSelect={(type) => setFormData({...formData, backendType: type})}
            />
          </div>

          {/* GitHub配置（仅在选中时显示） */}
          {formData.backendType === 'github' && (
            <div className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Database size={14}/> GitHub 配置
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block tracking-wider">
                  GitHub Token
                </label>
                <input
                  required
                  type="password"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-indigo-500 text-slate-200 text-sm"
                  placeholder="ghp_..."
                  value={formData.githubToken}
                  onChange={e => setFormData({...formData, githubToken: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block tracking-wider">
                  仓库 (用户名/仓库名)
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-indigo-500 text-slate-200 text-sm"
                  placeholder="user/repo"
                  value={formData.githubRepo}
                  onChange={e => setFormData({...formData, githubRepo: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block tracking-wider">
                    分支
                  </label>
                  <input
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-indigo-500 text-slate-200 text-sm"
                    value={formData.githubBranch}
                    onChange={e => setFormData({...formData, githubBranch: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block tracking-wider">
                    存储路径
                  </label>
                  <input
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-indigo-500 text-slate-200 text-sm"
                    value={formData.githubPath}
                    onChange={e => setFormData({...formData, githubPath: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* AI配置 */}
          <div className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Sparkles size={14}/> AI 配置 (Gemini 3 / DeepSeek)
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <select
                className="bg-slate-950 border border-slate-800 rounded p-2 text-xs outline-none focus:border-indigo-500"
                value={formData.aiProvider}
                onChange={e => setFormData({...formData, aiProvider: e.target.value})}
              >
                <option value="gemini">Gemini (OpenRouter)</option>
                <option value="deepseek">DeepSeek (Official)</option>
              </select>
              <input
                className="bg-slate-950 border border-slate-800 rounded p-2 text-xs outline-none focus:border-indigo-500"
                placeholder="模型名称"
                value={formData.aiModel}
                onChange={e => setFormData({...formData, aiModel: e.target.value})}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block tracking-wider">
                API Key
              </label>
              <input
                type="password"
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-indigo-500 text-slate-200 text-sm"
                placeholder="sk-..."
                value={formData.aiKey}
                onChange={e => setFormData({...formData, aiKey: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
          >
            保存配置
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full text-slate-500 hover:text-slate-300 py-2 text-sm transition-colors"
          >
            取消
          </button>
        </form>

        {initialConfig && (
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <button
              onClick={onLogout}
              className="text-red-400 hover:text-red-300 text-sm flex items-center justify-center gap-2 font-medium"
            >
              <LogOut size={16}/> 断开连接 & 清除配置
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
```

---

### 7️⃣ MobileView（第751-1050行）

**关键改动**：
- 保留原始功能（今日任务、最近录入）
- 使用统一的storageService

```jsx
const MobileView = ({ onSettings, notify, directions }) => {
  // === 改动：使用统一服务 ===
  const [records, setRecords] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [details, setDetails] = useState({ type: TYPE.IDEA, dueDate: "", note: "" });
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      // === 改动：使用统一服务 ===
      const data = await storageService.fetchRecords();
      const sortedData = data.sort((a, b) => (b.fields["记录日期"] || 0) - (a.fields["记录日期"] || 0));
      setRecords(sortedData);
    } catch (e) {
      console.error("加载数据失败:", e);
      notify("加载数据失败", "error");
    }
  };

  // 今日任务
  const todayTasks = useMemo(() => {
    const todayStr = getLocalDateString();
    return records.filter(r =>
      r.fields["类型"] === TYPE.TASK &&
      r.fields["截止日期"] &&
      new Date(r.fields["截止日期"]).toDateString() === new Date(todayStr).toDateString()
    ).sort((a, b) => {
      const isDoneA = a.fields["状态"] === STATUS.DONE ? 1 : 0;
      const isDoneB = b.fields["状态"] === STATUS.DONE ? 1 : 0;
      if (isDoneA !== isDoneB) return isDoneA - isDoneB;

      const priorityOrder = { [PRIORITY.HIGH]: 0, [PRIORITY.NORMAL]: 1, [PRIORITY.LOW]: 2 };
      const pA = priorityOrder[a.fields["优先级"]] ?? 1;
      const pB = priorityOrder[b.fields["优先级"]] ?? 1;
      return pA - pB;
    });
  }, [records]);

  // 最近录入
  const recentInputs = useMemo(() => records.slice(0, 10), [records]);

  // 乐观更新
  const updateLocalRecord = (id, newFields) => {
     setRecords(prev => prev.map(r => r.id === id ? { ...r, fields: { ...r.fields, ...newFields } } : r));
  };

  const addLocalRecord = (newRecord) => {
     setRecords(prev => [newRecord, ...prev]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setIsSending(true);

    const now = Date.now();
    let finalTitle = inputValue;
    let finalContent = details.note;
    let originalUrl = null;

    // === 改动：提取URL ===
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urlMatch = (inputValue + " " + (details.note || "")).match(urlRegex);
    if (urlMatch && urlMatch.length > 0) {
      originalUrl = urlMatch[0];
    }

    // 乐观更新
    const optimisticRecord = {
        id: "temp_" + now,
        fields: {
            "标题": inputValue,
            "内容": details.note,
            "状态": STATUS.INBOX,
            "类型": details.type,
            "记录日期": now,
            "截止日期": details.dueDate ? new Date(details.dueDate).getTime() : null,
            "优先级": PRIORITY.NORMAL,
            "来源": "Mobile",
            "内容方向": "个人成长"
        }
    };
    addLocalRecord(optimisticRecord);

    setInputValue("");
    setDetails({ type: TYPE.IDEA, dueDate: "", note: "" });
    setShowDetails(false);

    try {
        // AI优化
        try {
            const aiResult = await aiService.optimize(finalTitle, finalContent, details.type);
            finalTitle = aiResult.title;
            finalContent = aiResult.content;
        } catch(e) {
            console.warn("AI优化失败，使用原始输入", e);
            if (originalUrl && !finalContent.includes('原文链接')) {
              finalContent += `\n\n原文链接: ${originalUrl}`;
            }
        }

        // === 改动：使用统一服务 ===
        await storageService.addRecord({
          title: finalTitle,
          content: finalContent,
          source: "Mobile",
          type: details.type,
          status: STATUS.INBOX,
          direction: "个人成长",
          url: originalUrl
        });

        notify("已记录", "success");
        loadData();
    } catch (error) {
        console.error("添加记录失败:", error);
        notify("发送失败: " + error.message, "error");
    } finally {
        setIsSending(false);
    }
  };

  const handleEditSave = async (id, fields) => {
    updateLocalRecord(id, fields);
    setEditingItem(null);
    notify("修改已保存", "success");
    try {
      await storageService.updateRecord(id, fields);
      loadData();
    } catch (error) {
      notify("保存失败: " + error.message, "error");
    }
  };

  const handleDone = async (id) => {
    updateLocalRecord(id, { "状态": STATUS.DONE });
    notify("任务完成", "success");
    try {
      await storageService.updateRecord(id, { "状态": STATUS.DONE });
      loadData();
    } catch (error) {
      notify("更新失败: " + error.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col p-6 animate-fade-in">
      <header className="flex justify-between items-center mb-8">
        <Logo />
        <button onClick={onSettings} className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-slate-400">
          <Settings size={20} />
        </button>
      </header>

      {/* 快速收集 */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">记录灵感</h2>
        <p className="text-slate-500 mb-8 text-sm">灵感转瞬即逝，现在就记下来。</p>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="输入标题或想法..."
            className="w-full bg-transparent text-xl font-medium outline-none placeholder:text-slate-700 mb-4"
          />
          <textarea
            value={details.note}
            onChange={e => setDetails({...details, note: e.target.value})}
            placeholder="更多细节 (可选)..."
            className="w-full bg-transparent text-slate-400 outline-none resize-none h-32 text-sm custom-scrollbar"
          />

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-800">
            <div className="flex gap-3">
              {[TYPE.IDEA, TYPE.TASK, TYPE.NOTE, TYPE.JOURNAL].map(t => (
                <button
                  key={t}
                  onClick={() => setDetails({...details, type: t})}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    details.type === t
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {t === TYPE.IDEA && <Lightbulb size={18} />}
                  {t === TYPE.TASK && <CheckSquare size={18} />}
                  {t === TYPE.NOTE && <FileText size={18} />}
                  {t === TYPE.JOURNAL && <Book size={18} />}
                </button>
              ))}
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isSending}
              className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 hover:bg-indigo-500 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSending ? <Loader2 className="animate-spin" /> : <Send size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* === 保留：今日任务 === */}
      {todayTasks.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-300">
            <Calendar size={18} className="text-indigo-400"/>
            今日任务 ({todayTasks.length})
          </h3>
          <div className="space-y-2">
            {todayTasks.slice(0, 5).map(item => (
              <div
                key={item.id}
                onClick={() => setEditingItem(item)}
                className={`bg-slate-900 p-4 rounded-xl border flex items-center justify-between transition-all ${
                  item.fields["状态"] === STATUS.DONE
                    ? 'border-slate-800 opacity-50'
                    : 'border-slate-800'
                }`}
              >
                <span className={`text-sm font-medium ${
                  item.fields["状态"] === STATUS.DONE ? 'text-slate-500 line-through' : 'text-slate-200'
                }`}>
                  {item.fields["标题"]}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDone(item.id);
                  }}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    item.fields["状态"] === STATUS.DONE
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-600 text-transparent hover:border-emerald-500'
                  }`}
                >
                  <Check size={14}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

---

### 8️⃣ DesktopView（第1051-1450行）

**保留原始完整功能**，使用统一服务

```jsx
const DesktopView = ({ onLogout, onSettings, notify, directions }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [records, setRecords] = useState([]);
  const [inboxItems, setInboxItems] = useState([]);
  const [todoItems, setTodoItems] = useState([]);
  const [doingItems, setDoingItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebouncedValue(searchText, 300);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // === 改动：使用统一服务 ===
      const data = await storageService.fetchRecords();
      setRecords(data);

      // 分类数据
      setInboxItems(data.filter(r => r.fields["状态"] === STATUS.INBOX));
      setTodoItems(data.filter(r => r.fields["状态"] === STATUS.TODO));
      setDoingItems(data.filter(r => r.fields["状态"] === STATUS.DOING));
      setDoneItems(data.filter(r => r.fields["状态"] === STATUS.DONE));
    } catch (e) {
      console.error("加载数据失败:", e);
    }
  };

  // ... 其余逻辑保持不变，使用 storageService ...

  return (
    <div className="flex h-screen bg-slate-950">
      {/* 侧边栏导航 */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
        <div className="mb-8 px-2">
          <Logo textSize="text-2xl" />
        </div>

        <nav className="space-y-6 flex-1">
          <NavItem icon={LayoutDashboard} label="仪表盘" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase text-slate-600 tracking-wider">Capture</div>
            <NavItem icon={Inbox} label="收件箱" count={inboxItems.length} active={activeTab === 'inbox'} onClick={() => setActiveTab('inbox')} />
          </div>
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase text-slate-600 tracking-wider">Organize</div>
            <NavItem icon={Layout} label="计划看板" active={activeTab === 'planner'} onClick={() => setActiveTab('planner')} />
            <NavItem icon={BookOpen} label="知识库" active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} />
          </div>
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase text-slate-600 tracking-wider">Analytics</div>
            <NavItem icon={BarChart3} label="数据统计" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
          </div>
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-800">
          <NavItem icon={Settings} label="设置" onClick={onSettings} />
          <NavItem icon={LogOut} label="退出" onClick={onLogout} />
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        {activeTab === 'dashboard' && <DashboardView records={records} notify={notify} />}
        {activeTab === 'inbox' && <InboxView items={inboxItems} onMove={handleMoveToTodo} onUpdate={handleUpdate} />}
        {activeTab === 'planner' && <PlannerView todo={todoItems} doing={doingItems} done={doneItems} onUpdate={handleUpdate} />}
        {activeTab === 'knowledge' && <KnowledgeView items={records} />}
        {activeTab === 'stats' && <StatsView records={records} />}
      </div>
    </div>
  );
};

// 导航项组件
const NavItem = ({ icon: Icon, label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all mb-1 ${
      active
        ? 'bg-indigo-500/10 text-indigo-400'
        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="font-medium text-sm">{label}</span>
    </div>
    {count !== undefined && count > 0 && (
      <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400">
        {count}
      </span>
    )}
  </button>
);
```

---

### 9️⃣ 主App组件（第1451-1529行）

**关键改动**：初始化storageService

```jsx
export default function App() {
  const [config, setConfig] = useState(() => {
    // === 改动：读取后端配置 ===
    const saved = localStorage.getItem('lifeos_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      // 初始化对应的服务
      storageService = StorageServiceFactory.getServiceFromConfig(parsed);
      return parsed;
    }

    // 默认使用GitHub服务
    storageService = StorageServiceFactory.createService('github');
    return { backendType: 'github' };
  });

  const [screen, setScreen] = useState('welcome');
  const [toast, setToast] = useState(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // 监听配置变化，切换服务
  useEffect(() => {
    if (config?.backendType) {
      try {
        const newService = StorageServiceFactory.createService(config.backendType);
        storageService = newService;
        console.log('存储服务已切换:', storageService.getServiceName());
      } catch (error) {
        console.error('服务切换失败:', error);
      }
    }
  }, [config?.backendType]);

  const notify = (message, type = 'info') => setToast({ message, type });

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('lifeos_config', JSON.stringify(newConfig));
  };

  const handleLogout = () => {
    localStorage.removeItem('lifeos_config');
    storageService = null;
    setConfig(null);
    setScreen('welcome');
  };

  if (screen === 'welcome') {
    return (
      <div className="bg-slate-950 min-h-screen">
        <MobileView onSettings={() => setScreen('settings')} notify={notify} directions={CONTENT_DIRECTIONS} />
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    );
  }

  if (screen === 'settings') {
    return (
      <div className="bg-slate-950 min-h-screen">
        <SettingsScreen
          onSave={handleSaveConfig}
          onCancel={() => setScreen(config ? 'main' : 'welcome')}
          initialConfig={config}
          notify={notify}
          onLogout={handleLogout}
        />
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen">
      {isMobile ? (
        <MobileView onSettings={() => setScreen('settings')} notify={notify} directions={CONTENT_DIRECTIONS} />
      ) : (
        <DesktopView onLogout={handleLogout} onSettings={() => setScreen('settings')} notify={notify} directions={CONTENT_DIRECTIONS} />
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
```

---

## 📊 数据流图

```
用户操作
   ↓
App组件
   ↓
storageService (统一接口)
   ↓
┌─────────────┬─────────────┐
│             │             │
GitHub服务    飞书服务      未来扩展
(已实现)     (待添加)
```

---

## 🎯 主要改动点总结

### ✅ 已优化
1. **后端抽象** - StorageService接口
2. **GitHub服务** - 完整CRUD实现
3. **Jina Reader** - URL抓取、平台识别
4. **错误处理** - 重试机制、详细提示

### 🔄 需要整合
1. **App.jsx主文件** - 整合所有功能
2. **DesktopView** - 恢复完整UI
3. **MobileView** - 保留+增强

### 📋 待优化
1. **飞书服务适配** - 实现StorageService接口
2. **后端切换测试** - 确保无缝切换
3. **UI细节优化** - 基于用户反馈

---

## ⏱️ 预计实施时间

- **创建融合版App.jsx**: 30分钟
- **测试功能**: 15分钟
- **优化调整**: 15分钟
- **总计**: 约1小时

---

看完这个设计，你觉得怎么样？有什么需要调整的地方吗？确认后我就开始创建融合版！😊
