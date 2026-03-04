---
title: "我放弃使用 OpenClaw 了"
source: "https://x.com/joooe453/status/2028028166435172725"
author:
  - "[[Unknown]]"
published: 2026-03-01
created: 2026-03-03
description:
tags:
  - "clippings"
---
我从年初 Clawdbot 时期就开始玩，一路跟着改名 Moltbot、再到 OpenClaw。一个多月，Mac Mini 上 24 小时跑着，串了 Telegram、email、日历，想打造一个什么都能干的 AI 助理。

上周我把它关了。不是因为它不酷，而是「酷」跟「能用」是两件事。

## 为什么放弃

1. 记忆：OpenClaw 说能记住你讲过的话，下次聊天自动带入。但用久了你会发现一件很智障的事：它还是会忘记你说过的东西。
2. 烧钱：OpenClaw 每 30 分钟自动醒来检查有没有事做。每次检查都在花 API 的钱——读 email 花钱、查日历花钱、看 Telegram 花钱。一件简单的事它经常要连续调用好几次 AI 才搞定。我跑一个月账单超过 $150，比直接订阅 Claude Max 贵。
3. 安全问题：Kaspersky 查出 512 个漏洞。研究员在网上扫到 4 万多个门户大开的 OpenClaw，API 密钥和聊天记录全裸露。Cisco 测了一个社区插件，发现它偷偷把数据传到外部服务器，用户完全不知情。
4. **你可能根本不需要 24/7 的 AI。** 这是我最后才想通的。真正有价值的工作全都是我自己主动坐下来做的事。后台跑的机器人做的大多是琐事，犯不着动用 AI。

## 剥开来看，OpenClaw 其实就做两件事

把花哨的功能全拿掉，OpenClaw 的核心就是：

1. **记住你** — 知道你是谁、在做什么、喜欢什么
2. **自己动** — 不用你开口，主动帮你处理事情

搞清楚这个，问题就变成：Claude 能不能做到？

## 复刻「记住你」：打造你的 SOUL.md

很多人玩 OpenClaw 最兴奋的就是写 [SOUL.md](https://soul.md/) ，一份告诉 AI「你是谁」的说明书。OpenClaw 把这件事拆成了七八个文件：[SOUL.md](https://soul.md/) 定义人格、[IDENTITY.md](https://identity.md/) 定义身份、[USER.md](https://user.md/) 描述你是谁、[AGENTS.md](https://agents.md/) 写行为规则、[MEMORY.md](https://memory.md/) 存长期记忆，还有一堆技能文件。每次对话开始，它按顺序全部读一遍，这样 AI 就「知道」自己是谁、主人是谁、该怎么做事。

Claude Code 里面，这些全部合并成一个文件：[CLAUDE.md](https://claude.md/)。

你在项目文件夹里建一个 [CLAUDE.md](https://claude.md/)，把以下几件事写清楚就好：

> \# JARVIS — 我的私人 AI 助理 ## 身份 你是 JARVIS，我的私人 AI 助理。你说话简洁有观点， 用中文回复，必要时可以夹英文术语。 ## 关于我 - 我叫 Joe，21 岁，政治大学国贸系 - 在xx做 Marketing Intern - 同时是xx台湾 BD，专注xx生态 - 共同创办了 [@Node\_Z\_](https://x.com/@Node_Z_) - 我平时需要写推文和营销文案 ## 行为规则 - 回答要直接，不要啰嗦 - 写营销文案时要有 KOL 的语感，不要像机器人 - 涉及 crypto 项目时要查最新资讯再回答 - 不确定的事情要说不确定，不要瞎编 ## 记忆管理 - 重要的事情主动写进 memory - 我说「记住」的东西一定要记 - 每次对话结束前，把值得记住的重点存下来

70 行就搞定了。OpenClaw 要七个文件几百行，效果是一样的。

Claude Code 每次开新对话都会自动读这个文件，等于 AI 永远知道自己是谁、你是谁、该怎么做事。你也可以随时改风格、换角色、加规则，改完下次对话就生效。

## 复刻「跨对话记忆」

OpenClaw 的记忆分三层：长期笔记、每日日志、全文搜索。

用 Claude 怎么对标？

**长期记忆：直接叫 Claude 记住**

在 [Claude.ai](https://claude.ai/)（网页版/手机版）里，你直接在对话中讲：

- 「记住我在xx做 marketing intern」
- 「记住我偏好简体中文」
- 「记住我的写作风格要简洁有观点」

它会永久存起来，以后每次新对话自动带入。你也可以说「忘记 XX」随时删除，去 Settings 能看到它记住的所有东西。

另外打开 Settings → Capabilities 里的「Generate memory from chat history」，Claude 还会自动从你平时的聊天中归纳重点：你的角色、项目、习惯，不用你主动讲它自己会整理。

跟 OpenClaw 最大的差别是：Claude 的记忆是独立存的，不会因为对话太长被压缩时跟着搞丢。OpenClaw 最头疼的问题就是聊到一半前面的记忆被压缩变形，Claude 没这个问题。

如果你用 Claude Code，它还有一套自动记忆，每次用完它会自动记下学到的东西（你的习惯、项目结构、踩过的坑），存在本地，下次开工自动载入，显示「Recalled X memories」。你什么都不用做，记忆自己累积。

**对话历史：搜得到就不怕忘**

Claude 能搜你所有的历史对话。直接问「我们上周聊了什么」、「找一下之前那个 tokenomics 分析的对话」，它会搜到相关内容直接引用，不用你自己维护任何东西。

## 进阶：用 Obsidian 当记忆中心

上面讲的是 Claude 内建的记忆，对大多数人够用了。但如果你跟我一样有大量笔记、项目资料、研究素材，想让 AI 真正理解你的整个知识库，有一个更强的做法：**把 Obsidian 接上去。**

[https://x.com/obsdmd/status/2027416335689638245?s=20](https://x.com/obsdmd/status/2027416335689638245?s=20)

Obsidian 1.12 刚发布了官方 CLI——你可以在终端里直接操作你的笔记库：搜索、读写笔记、查标签、查反向链接，什么都行。重点是：Claude Code 也跑在终端里。两个一接，你的整个 Obsidian 笔记库就变成了 AI 的记忆。

设定方法：

1. 更新 Obsidian 到 1.12 以上
2. Settings → General → 打开 CLI
3. 在你的 [CLAUDE.md](https://claude.md/) 里加一段：

> \## Obsidian 整合 - 用 \`obsidian search\` 搜索笔记，不要自己翻文件 - 用 \`obsidian files read\` 读笔记内容 - 用 \`obsidian files append\` 追加内容到笔记 - 用 \`obsidian daily\` 操作每日笔记 - 查资料时优先搜 Obsidian，找不到再搜网络

搞定。以后你跟 Claude Code 对话，它会直接搜你的 Obsidian 找答案，不用你手动贴笔记过去。

这比 OpenClaw 的记忆系统强在哪？OpenClaw 的记忆就是一堆 markdown 文本文件，搜索是模糊匹配，笔记多了就不准。Obsidian 有自己的搜索引擎——标签、反向链接、全文搜索都是秒级响应，而且你本来就在用它管理知识，不用额外维护一套东西。有人实测过，同样找一条笔记，用原始文件扫描要烧 700 万 token，用 Obsidian CLI 只要 100 个。

如果你不想用 CLI 的方式，也可以装 MCP 插件让 Claude 直接连 Obsidian。社区已经有现成的方案，装上去 Claude Desktop 和 Claude Code 都能读写你的笔记库。

## 复刻「在手机上跟 AI 对话」

OpenClaw 最爽的是在 Telegram 里直接跟 AI 讲话，它能帮你干任何事。Claude 有两个方式做到：

**方式一：Remote Control（官方方案）**

Claude Code 最近出了 /remote-control 功能：在电脑上开一个 session，然后用手机的 Claude App 连上去。手机上打字、说话，电脑上的 Claude Code 执行。消息几乎秒级同步，笔记本合盖醒来会自动重连。

好处是完全走 Anthropic 官方的通道，安全，不用自己架任何东西。缺点是你的电脑得开着。

**方式二：Telegram Bot（社区方案）**

如果你就是要在 Telegram 用，有现成的开源方案：

1. 装 claude-code-telegram：uv tool install git+[https://github.com/RichardAtCT/claude-code-telegram](https://github.com/RichardAtCT/claude-code-telegram)
2. Telegram [@BotFather](https://x.com/@BotFather) 创 bot 拿 token
3. 设好你的 bot token、Telegram ID、工作目录
4. 启动，在 Telegram 直接跟 Claude 对话

支持语音、图片、文件，每个项目的对话记录都保留。

## 复刻「自动帮你做事」

OpenClaw 每 30 分钟自动醒来看看有没有事做。Claude 的 Cowork 功能可以做类似的事：设定排程（/schedule），让 Claude 在指定时间自动跑。

我的设定：

- 每天早上 9 点：监控 DeFi 竞品账号，抓过去 24 小时高互动推文
- 每周一 10 点：生成上周 marketing 表现摘要
- 每天下午 6 点：整理今天的重要消息

跟 OpenClaw 的 cron 一样，Cowork 是你设好时间它去做，不是 AI 自己判断。但 OpenClaw 的 heartbeat 自动检查 90% 的时候看一看什么都没做，白白烧钱。不如直接设定什么时候做什么。

## 成本

- **OpenClaw**：API 按量计费，我一个月 $150+，你不知道下个月多少
- **Claude Pro**：$20/月。够大部分人用
- **Claude Max**：$100-200/月。重度使用者、要用 Claude Code 的选这个

月费制，账单可预测。

## 最后

OpenClaw 的想法很屌：**每个人都该有一个强大的 AI 助理。**

但现阶段它是很酷但不能信任的实验品。

而 Claude 的生态系统——[CLAUDE.md](https://claude.md/) 给它人格、Memory 让它记住你、Obsidian 当它的知识库、Remote Control 让你用手机操控、Cowork 让它定时干活——这些拼起来，已经能做到 OpenClaw 八九成的事，而且更稳、更安全、更便宜。

与其花时间修你的 AI 助理，不如让 AI 助理帮你做正事。

这就是我关掉 OpenClaw 的原因。