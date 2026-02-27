# 前端代码提升专家

拒绝平庸的"AI风格"界面，生成具有独特审美、精心设计的前端代码。

---

## 🎯 核心功能

- **字体设计**：避免系统默认字体，使用精心挑选的字体
- **色彩主题**：拒绝通用SaaS配色，创造连贯的审美主题
- **动态效果**：用动画赋予界面"呼吸感"
- **背景深度**：多层渐变、纹理、噪点效果

---

## 📋 使用方法

```
生成一个前端页面，主题是[你的主题]
```

或更详细：

```
帮我生成一个[页面类型]页面：
- 主题：[核心主题]
- 风格：[审美倾向，如复古/蒸汽波/RPG]
- 技术栈：[HTML/React/Vue等]
- 核心功能：[主要功能]
```

---

## 🎨 设计原则

### 1. 字体设计 (Typography)

**严禁使用：**
- Inter, Roboto, Open Sans, Arial 等系统默认或过度使用的字体

**推荐选择：**

| 风格 | 推荐字体 |
|------|---------|
| 代码/硬核感 | JetBrains Mono, Fira Code, Space Grotesk |
| 社论/高级感 | Playfair Display, Crimson Pro, Newsreader |
| 技术/专业感 | IBM Plex Family, Source Sans 3 |

**排版原则：**
- 追求极致对比
- 使用大跨度的字重（100 与 900 对比）
- 显著的字号差异（至少 3 倍跳跃）
- 推荐从 Google Fonts 动态加载

---

### 2. 色彩与主题 (Color & Theme)

**拒绝：**
- 白色背景搭配淡紫色渐变的"通用 SaaS"配色

**要求：**
- 提交一个连贯的审美主题
- 使用 CSS 变量管理颜色
- 大胆使用主色调与尖锐的对比色点缀
- 可以从 IDE 主题（Monokai, Dracula）或特定文化审美汲取灵感

**示例配色方案：**

| 主题 | 主色 | 强调色 | 背景 |
|------|------|--------|------|
| Monokai | #66D9EF | #F92672 | #272822 |
| Dracula | #BD93F9 | #FF79C6 | #282A36 |
| 蒸汽波 | #FF71CE | #01CDFE | #2DF7F5 |
| 复古棕 | #8B4513 | #D2691E | #F5E6D3 |

---

### 3. 动态效果 (Motion)

**原则：**
用动画赋予界面"呼吸感"和微交互

**实现：**

```css
/* HTML - CSS 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: var(--delay, 0s);
}
```

```jsx
// React - Framer Motion
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  内容
</motion.div>
```

**高光时刻：**
- 页面加载时使用交错显现（animation-delay）
- 比散乱的微交互更能提升用户愉悦感

---

### 4. 背景与深度 (Backgrounds)

**拒绝：**
- 纯色或简单的单层渐变

**要求：**
- 创造大气、有深度的背景
- 通过多层 CSS 渐变叠加
- 几何纹理（Patterns）
- 符合语境的噪点效果

**示例：**

```css
/* 多层渐变背景 */
.background {
  background:
    radial-gradient(circle at 20% 50%, rgba(102, 217, 239, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(249, 38, 114, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

/* 噪点纹理 */
.noise-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

---

### 5. 核心禁令 (Anti-Patterns)

**避免：**
- 可预测的布局（永远一致的居中 Hero Section）
- 缺乏语境感的"模版式"组件
- 纯粹为了动画而动画的过度效果

**终极指令：**
思考"箱子之外"的可能性。在每一代输出中尝试不同的字体、不同的审美倾向，确保最终结果让人感到是经过精心设计的，而非模型统计概率的产物。

---

## 💡 审美风格示例

### 复古终端风
```
字体: JetBrains Mono / Fira Code
配色: 黑绿 #0F0 / 黑底 #000
背景: CRT 扫描线效果
装饰: 闪烁光标、像素边框
```

### 蒸汽波风
```
字体: Space Grotesk
配色: 霓虹粉 #FF71CE、青色 #01CDFE
背景: 渐变网格 + 雕塑
装饰: 漂浮元素、故障效果
```

### RPG游戏风
```
字体: Crimson Pro（标题）+ Source Sans 3（正文）
配色: 金色 #FFD700、深褐 #3E2723
背景: 羊皮纸纹理
装饰: 边框、卷角、印章
```

### 科技未来风
```
字体: IBM Plex Sans
配色: 电光蓝 #00FFFF、品红 #FF00FF
背景: 深色 + 网格线
装饰: 全息效果、发光边框
```

---

## 📦 代码模板

### HTML + Tailwind

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[页面标题]</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #66D9EF;
      --accent: #F92672;
      --bg-dark: #1a1a2e;
      --bg-light: #16213e;
      --text: #f8f8f2;
    }
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: var(--bg-dark);
      color: var(--text);
      margin: 0;
      padding: 0;
    }
    .code {
      font-family: 'JetBrains Mono', monospace;
    }
  </style>
</head>
<body>
  <!-- 内容 -->
</body>
</html>
```

### React + Framer Motion

```jsx
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 内容 */}
    </motion.div>
  );
}
```

---

## ✅ 质量检查清单

生成前确认：

- [ ] 字体不是系统默认（Inter/Roboto等）
- [ ] 有明确的配色主题（CSS变量管理）
- [ ] 背景有深度（多层渐变/纹理）
- [ ] 包含适当的动画效果
- [ ] 布局不是通用模版
- [ ] 符合所选审美风格

---

## 🔗 相关资源

- Google Fonts: https://fonts.google.com
- Framer Motion: https://www.framer.com/motion/
- Coolors: https://coolors.co（配色灵感）
- Tailwind CSS: https://tailwindcss.com

---

*Skill 版本: 1.0.0 | 最后更新: 2026-02-26*
*特点: 拒绝平庸AI风格、独特审美指导、完整设计原则*
