---
title: "OpenCode + SVG：一套省心可控的 AI PPT 生成方案"
source: "https://mp.weixin.qq.com/s/5j0xqaJs18pLGHVfyajJ3Q"
author:
  - "[[vigor]]"
created: 2026-02-07
description: "从此告别手搓PPT！"
tags:
  - "clippings"
---
原创 vigor *2026年1月20日 08:15*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsrCR4KgQb5U69lo38entBVXPAnUpjM6SyIcbibYPugDrAH0DBZQFpqYfA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

前两天接到个活儿，要做个项目方案演示 PPT。

打开 PowerPoint 的那一刻，我盯着空白页面发了五分钟呆。🙁

说实话，作为一个产品，PPT 能力属实一般——内容我能写，但怎么让它 **好看** 、 **有重点** 、 **一眼能抓住人** ，这事儿我真不太行。

正好最近 OpenCode 特别火，号称是 Claude Code 的平替。最关键的是，它支持接入 GitHub Copilot 作为模型能力。

巧了，公司正好给订阅了 Copilot 企业版 😄

也就是说，我现在直接实现了 **API 自由** ——装个 OpenCode，切到 Copilot，然后猛猛造就完事儿了。

于是就有了这篇： **用 OpenCode 无痛生成可编辑 PPT 的完整流程** 。

---

### 预期管理

先说清楚，咱们今天分享的这套方案，主打三个字：

- 简单实用 （不需要mcp、skills）
- 复用性强 （掌握方法后可在多种PPT场景下使用）
- 可控性高 （支持持续性的调整和二次修改）

最关键的是——输出的内容 **可以在 PPT 里二次编辑** ，不像 NotebookLM 那种，生成出来是张图片，改都没法改。

但有一点要提前说：这次主打实用，美观性这种主观因素先不深究。不过可以保证，出来的效果直接拿去用是没问题的。

还有，我下面描述的操作流程更多是 **提供一种思路** ，很多步骤不是固定的，也没有所谓「一键出成果」的操作。希望大伙儿按这个思路多试试，换不同风格玩玩看。

---

### 省流总结

凡是需要把复杂信息结构化呈现、用图形辅助理解的场景，都很契合这套流程。

熟悉 Vibe Coding 的小伙伴，看完这个流程估计不用看细节就能直接上手了：

1. 安装 OpenCode
2. 安装官方插件 oh-my-opencode
3. 创建项目文件夹，准备好 PPT 文稿内容
4. 用 OpenCode 打开项目文件夹，切换到 Plan 模式，输入 ulw 进入 **Ultrawork 模式**
5. 输入下文准备好的 Prompt，选择 PPT 风格，输出为 SVG 格式
6. 在 PPT 中导入 SVG 文件，点击「转换为形状」
7. 微调一下文本排列和字号，搞定！

## 效果展示

正好这两天国外 X 上有位大佬发了篇长文特别火：「如何在一天内彻底修复你的人生」，我就拿这篇文章来做流程演示。

这是从一篇 4000 字的长文，到一套可编辑的 PPT录屏效果。

全程用 OpenCode 生成，导入后可以直接在 PPT 里改，先瞅瞅看效果如何👇

> 原文链接：https://x.com/thedankoe/status/2010751592346030461?s=20

## 前期准备

### 1\. 安装 OpenCode

打开官网，安装指引很详细。支持三种方式： 终端 、 客户端 、 IDE 插件 。

个人推荐直接选 **客户端** ——方便查看历史记录，使用门槛也低。

> 官方安装链接：https://opencode.ai/download

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsr5DocEnkiaib0fVMiaE6ibicCr3HH7cSoSj2fficfZo0m6YiaqVhoyefHp2HCQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

---

### 2\. 添加模型提供商

安装完成后，打开终端输入以下命令，选择 Agent 执行任务时用哪个模型提供商：

```
opencode auth login
```

我这里直接选了 GitHub Copilot 。

没有提前准备 API 也没关系——官方很贴心地内置了几个免费模型，终端里选第一项，或者客户端里选置顶的几个大模型，就能直接免费用。

> 备注：以下所有效果均通过 GitHub Copilot 的 Claude Opus 4.5 模型生成。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsricshrzxHXYbsuEeGIbhibBy4usRM4fO6wEPNdzb6UnH9yIAImup1nOOg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2) ![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsrnh3Jm65ic9g3okRcS8elGZ2fIB1XwTSprl7LDy6dicMQyiax2heBX6uxg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

---

### 3\. 安装 oh-my-opencode 插件

这一步很关键。

oh-my-opencode 是官方插件，一个强大的 OpenCode 扩展集合。简单说，开启后会进入 **火力全开模式** ，自动根据任务情况安排最合适的工作 Agent。

安装很简单，直接在对话框输入：

```javascript
"Install and configure by following the instructions here https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/refs/heads/master/README.md"
```

> 参考文档：https://www.opencodecn.com/docs/best-practices/oh-my-opencode

---

### 4\. 准备项目文件

新建一个文件夹作为项目文件夹，把 PPT 文稿内容存成 .md 格式放进去，然后用 OpenCode 客户端打开这个文件夹。

到这里，所有前置准备就完成了。接下来进入 PPT 生成的具体步骤 👇

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsr68CicmsjF760CiahpaKWlThXaWYf08qYPgebzZgsW0rvadGic97EDT4FQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

## PPT 生成操作流程

### 1\. 进入 Ultrawork 模式

打开项目文件后，在输入框直接输入 ulw ，让 OpenCode 进入「燃起来🔥」的 **Ultrawork 模式** 。

输入后，会先告知该模式的一些事项和规则。官方给出了详细的 Prompt，最下方也有使用场景说明：

- 探索代理 （背景）— 代码库结构、文件模式、内部实现
- 图书管理员代理 （背景）— 外部文档、API 参考、开源示例
- 计划代理 — 详细工作分解和策略
- 数据库代理 — 架构决策、代码审查、高智商推理
- 前端 UI/UX 工程师 — 视觉设计和实现
- 文档编写者 — 技术文档
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsrzDAtWqrLwia5hlN6JDlKBR57liaaUiaoRiawGmyZnZNicbwyU5mRojJicuPA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

---

### 2\. 分析 PPT 内容

接着，把工作模式切换成 Planner-Sisyphus ——这是 OpenCode 的 **计划只读模式** ，专门用于自我演进、迭代优化和处理高复杂度任务的规划模式。

然后通过 @ 符号引用 PPT 文案的 md 文件，在输入框输入：

```markdown
请作为一名资深 PPT 设计师，帮我处理这份文档： 1. **拆解**：提炼文档精华，产出结构化的 PPT 页面清单（包含页数、内容、重点）。 2. **渲染**：利用 SVG 矢量代码输出每一页的视觉雏形。要求：图文分离、层级分明，代码需兼容 PPT 的"转换为形状"功能，以便我进行后期可编辑式的二次调整。  
基于这些诉求，给出方案。
```

这一步其实不需要什么精妙的提示词。项目初期，每次对话更多是 **想法碰撞和方案定位** ，不是一开始就用提示词框死大模型的想象空间。

直接在 Plan 模式下抛出核心诉求：一是 拆解 ，二是 渲染 。然后让大模型输出方案，根据提示不断调整方向，最终达到效果即可。

**只要能出满意的效果，那这个提示词就是合理且有效的。**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsr9qc4ibBxUzxJUIudnpHB5BaBbcTfqpz0wmcpyIM7uMgkpF4p2LYpHNA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

按这个思路，大模型输出的方案大概率包括：

- 拆解后每页 PPT 的内容（标题、内容、重点...）
- PPT 输出模式确认（分页生成 / 全部生成）
- 设计规范确认（尺寸、配色、字体、风格...）
- SVG 输出格式要求（代码规范、组件规范...）

如果觉得拆解不合适，可以在 Planner 模式下持续对话，不断提要求，直到满意为止。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsrjHDX4UNOJzQcQXpfDKmOpGc1icjNTE6r1RMOg6w8QaMr2Zamtg6fETw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

---

### 3\. PPT 风格确认

这一步，建议只给定 尺寸要求 、 配色要求 、 主题色要求 ，剩下的布局排列和组件样式，推荐先让大模型自由发挥——体验一下抽盲盒的快乐。

可以参考我的输入试试，这里的配色是直接从公司 PPT 模板里扣的，大伙儿可以替换成自己的要求：

```javascript
尺寸要求：16:9主题风格：浅色风格配色要求：| 颜色用途 | RGB 值 | 说明 ||---------|--------|------|| 主色 | \`rgb(1,107,255)\` | 品牌蓝 || 次色 | \`rgb(86,91,255)\` | 紫蓝 || 辅助色 | \`rgb(46,204,247)\` | 青蓝 || 背景色 | \`rgb(246,246,246)\` | 浅灰 || 文字色 | \`rgb(0,0,0)\` | 黑色 |
```

先让大模型输出前三页看看效果。下面是第二、三页的效果——会发现实在太寡淡、太平面化了，不是不能用，就是一眼看上去没有记忆点。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsrewAiawcfwSRhtl2TWLhISh7m8dgJfDicic4NFY7s4icK7rvXfGzojDpvew/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

这时我想到： **好的 PPT 绝不是套用模板，而是要根据内容进行「适配性设计」，才能真正突出重点、制造记忆点。**

既然如此，能不能让大模型先理解文本，由它来构思最契合的风格和布局方案？

于是直接输入了一个简单的要求：

```
基于这篇文章的内容，和品牌配色，还可以有怎样的风格和布局推荐？
```

结果很 amazing！

OpenCode 内置的 Agent 能力非常强大——不仅分析出这篇文章的主题与「成长」「身份重塑」「行为心理学」「自我发展」等关键词相关，还会根据这些关键词在网上搜索相关的 PPT 设计方案，最终给出一个非常详细的每页风格推荐。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsryX7iaN3EAj5WzHrp09bDTtIL36vyCet5ibSIj1olUMNbJP8yVs9ibnDyA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

根据新的设计方案，第三页推荐使用「冰山隐喻」风格，效果如下——确实比第一版好太多了！

接着，只需要根据设计方案，对剩下的页面做批量生成即可。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsrI8RxPFJvkyp0HhpL5K3pPYuUCmCwrSk3EB3LIg4zIx2VZTctEPOJpw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

---

### 4\. PPT 内容编辑

SVG 批量生成后，难免有些文本内容或布局效果不符合预期。怎么办？

最简单的办法：直接在对话框描述问题，还可以通过 **截图标注** 辅助说明需要调整的地方。

如果只是文本内容的问题，也可以用 VSCode 打开 SVG 文件，直接手动改。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/setwsQuicKHIYTvLSTejNLic0NedCtqMsric9ibvxoSD2vex439EFfRIic35c7dfZ1OsYEpMCbOQVp7Ew0dLUialGQHA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

---

### 5\. PPT 文件导入

最后一步。

检查所有 SVG 效果图都满足要求后，把 SVG 文件导入 PPT，点击「转换为形状」，就能把 SVG 一键转成 PPT 支持的组件样式，对所有元素进行编辑和调整。

这样再也不用担心大模型生成的 PPT 是一次性的——上下文丢了，都不知道怎么改。

具体的导入和转化操作可以参考我往期的内容：

[谁说AI生成的PPT不能改？这个SVG大法太绝了](https://mp.weixin.qq.com/s?__biz=MzUyNjc5MTAyMQ==&mid=2247486113&idx=1&sn=828e0592cefe0d53d4c01698f43bcddc&scene=21#wechat_redirect)  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

实际操作中，转化后的效果还是会遇到不少问题：字号错乱、布局偏移、组件变形...

这里简单总结了一些优化方案，只需要在输出 SVG 前，把要求全部告知大模型即可：

```markdown
1️⃣ **圆角矩形优化**：使用 \`<path>\` + 贝塞尔曲线 \`C\` 命令绘制，避免 \`<rect rx="24">\` 在 PPT 中丢失圆角2️⃣ **字体优化**：Windows 字体优先排列 \`Microsoft YaHei, SimHei, PingFang SC, sans-serif\`，避免 PingFang SC 在 Windows 上不存在导致布局变化3️⃣ **文字定位优化**：使用 \`style\` 属性整合样式，手动计算居中位置，避免 \`text-anchor\` 和 \`dominant-baseline\` 属性支持不完善4️⃣ **颜色格式优化**：使用 \`#RRGGBB\` + \`fill-opacity\` 分离透明度，避免 \`rgba()\` 和带透明度的十六进制颜色支持不佳5️⃣ **阴影效果**：移除 \`filter="drop-shadow(...)"\` 属性，在 PPT 中转换后手动添加阴影
```

## 后续优化

这一套操作下来，熟悉大模型的伙伴可能会觉得：就这？连 MCP 和 Skills 都没用上，没啥新意。

但对于一些小白——比如连 OpenCode 或终端是什么都不知道的小伙伴——操作过程中还是会遇到不少问题的。

不过我觉得，AI 时代，只要能说得清楚、有明确报错信息的问题，丢给 AI 都能解决。所以还是希望能引导更多人去动手试试看。

后续计划研究一下 Skills ，正好扣子skills 不是也出了吗，打算把这些流程固化进去，尽可能实现 **一次生成就能满足效果** 的情况。

## 最后

PPT 这件事，难的从来不是内容，而是怎么让内容被看见。

现在有了 OpenCode + SVG 这条路，至少「呈现」这一步，可以交给 AI 先跑一版了。

剩下的，就是你来把控方向。

---

有问题欢迎留言，一起交流 👇

❤️ **关注 👍点赞 ↩️转发**

作者提示: 个人观点，仅供参考

继续滑动看下一个

懂点儿AI

向上滑动看下一个

剪存为飞书云文档