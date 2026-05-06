---
title: "2026年最香AI工具曝光：Claude Skill免费白嫖，小白友好，开箱即用，绝了！"
source: "https://x.com/vista8/status/2010540934359097689"
author:
  - "[[Unknown]]"
published: 2026-01-12
created: 2026-03-05
description:
tags:
  - "clippings"
---
2026年最想劝大家用的AI工具就是Claude Skill。

真的爽啊！比如：

**一句话解读论文，AI配图，发公众号。**

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image.jpg)

**一句话生成知识画布**

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%201.jpg)

**一句话生成小红书文案、封面和配图**

但是，这套玩法，对很多朋友都有障碍。

Claude 封号严重，找靠谱的第三方中转不容易。

即使能用，每月也要花上几百块。

**有没有免费方案？！**

经过乔帮主研究发现，世界上真的有“活菩萨”。

**不需要注册账号，不需要绑定信用卡，没有乱七八糟的各种限制。**

最关键的一条是：**免费**。

开箱即用，对小白极其友好，怪不得能在海外爆火。

从名字就能看出情怀，叫：OpenCode

## OpenCode 如何安装

官方网址：

> [https://opencode.ai/](https://opencode.ai/)

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%202.jpg)

支持Mac OS、Windows、Linux。

不仅有命令行Cli，也有客户端。

**推荐用命令行，客户端据说Bug有点多。**

以Mac为例，打开电脑终端（或Warp），输入下面命令，回车：

> curl -fsSL [https://opencode.ai/install](https://opencode.ai/install) | bash

安装好以后，输入opencode回车，就能看到界面。

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%203.jpg)

如果你用过Claude Code可能会比较熟悉。

如果没用过也不要慌，你可以输入/model

你就能看到大量免费模型，比如GLM-4.7等。

你如果订阅了GPT、Gemini可以输入/connect

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%204.jpg)

选中OpenAI或Google，打开浏览器登录账号授权后就能用Codex和Gemini模型。

他们一共提供75+模型供应商。

不乏一些知名海外模型和中转API，比如Mistral、OpenRouter、Groq等。

甚至还能添加本地Ollama安装的模型，相当的全面。

后续用GLM 4.7演示，除了免费，还有两个原因：

**1\. 代码生成能力不错**

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%205.jpg)

SWE-Bench，解决开源Python项目中的真实GitHub问题，GLM 成绩是 73.8%，绝对第一梯队水平。

HumanEval，Python编程问题 GLM-4.7 得分94.2%，依然优秀。

**2\. 工具调用和指令遵循能力**

IFEval 主要测指令遵循能力，成绩 88% 。

GSM8k 考察多步推理能力，成绩 98%。

感觉GLM-4.7对AI编程场景做了很多强化，极大提升了Agentic Coding能力。

尤其是代码生成、指令遵循能力，这对创建和调用Skill非常重要。

另外，经常有朋友夸 GLM-4.7 前端审美好，算锦上添花。

**OpenCode 直接免费提供这个模型，敞开了用就是。**

## 安装最强Agent框架Oh-My-Opencode

OpenCode不仅开源，提供免费模型，授权登录用付费模型。

好口碑的另一面来源于活跃的开发者生态。

备受推崇的就是**Oh-My-Opencode**（后面简称OMO）

装上这个，OpenCode编程体验直接起飞。

据说是作者烧了2.4万美元Token 换来的AI Agent编程框架。

**如何安装？**

你只需跟OpenCode说：“帮我安装 oh-my-opencode 插件”

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%206.jpg)

GLM 4.7 会思考推理，调用搜索工具等，找到安装指令。

OMO是一个Agent框架，为了更好整合、编排模型。

它会询问你是否有Claude、ChatGPT或Gemini订阅，为了后续集成。

你可以回答有哪些，如果都没有也能继续安装。

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%207.jpg)

很快就能安装成功。

后续也能添加订阅，输入opencode auth login即可。

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%208.jpg)

为啥一定要安装OMO插件呢？

首先，它内置了符合AI编程实践的常用Agent。

"Sisyphus（西西弗斯）"是它的主控Agent，通常由高智商模型扮演（如 Opus 4.5 High）。

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%209.jpg)

然后指挥它的子Agent干活，比如：

- **Oracle**：架构师、调试大神（GPT 5.2 Medium）
- **Frontend UI/UX Engineer**：前端与设计专家（Gemini 3 Pro）
- **Librarian**：翻阅文档、查开源实现、代码库探险（Claude Sonnet 4.5）
- **Explore**：极速代码库扫描（Grok Code）

其次，它内置了常用的MCP，比如：

- Exa（联网搜索）
- Context7（官方文档查询）
- [Grep.app](https://grep.app/)（GitHub 代码海搜）

最后，也是最重要的，它实现了跟Claude Code的兼容。

同样支持Command、Agent、Skill、MCP、Hook等技术方案。

这样才能让我们在OpenCode中轻松玩Skill。

还有很多超酷的东西和效果，太牛逼了！

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2010.jpg)

## 安装使用Skill

安装Skill非常简单。

比如Obsidian CEO写的Skills最近超级火。

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2011.jpg)

只需要打开Opencode，输入：

> “安装这里的skills [https://github.com/kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) ”

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2012.jpg)

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2013.jpg)

模型 GLM-4.7 会自己下载安装

使用也很简单，直接说：“画一个canvas解读《金字塔原理》”。

因包含canvas，模型会推理出要用json-canvas Skill。

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2014.jpg)

生成一个Obsidian格式的canvas格式文件，打开效果如下

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2015.jpg)

也可以输入斜杠“/”，找到已经安装的Skill，显式精准调用。

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2016.jpg)

## 创建 Skill

**建议先安装 Anthropic官方的元Skill**

也就是skill-creator

> [https://github.com/anthropics/skills/tree/main/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)

用这个Skill 来生成 Skill，哈哈哈！

最简单的Skill，可以只有一段提示词。

比如，我创建一个前端美化Skill：

> 调用skill-creator，用下面提示词创建一个Claude skill用于美化前端设计: \[提示词\]

提示词内容

> [https://xiangyangqiaomu.feishu.cn/wiki/K9bMweixHijuf4kOji7cbQVknhZ](https://xiangyangqiaomu.feishu.cn/wiki/K9bMweixHijuf4kOji7cbQVknhZ)

一会GLM-4.7就写好了名叫Designer的Skill。

**注意：新安装或刚写的Skill要退出重进Opencode才能找到**

（退出是按Ctrl + C）

我们做个测试，先写一个单页的Todolist

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2017.jpg)

调用Skill，给了3个设计方案

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2018.jpg)

选方案B效果

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2019.jpg)

**你看，设计Skill是不是很简单？**

Skill可以设计打包你的工作流、提示词等。

复杂Skill可能会包含一些脚本，MCP或API调用，参考文档等。

非常适合经验复用，流程自动化。

**如果把团队顶尖成员的工作流都变成Skill，这杠杆价值多大！**

## 分享Skill

写好的Skill就是一堆文件和文件夹的集合。

压缩发给别人就能共享。

如果懒得操作，你可以跟OpenCode说：“把 xx Skill打包下载”。

就会自动压缩，存在电脑下载文件夹。

也可以发布到Github分享，只需要跟OpenCode说：

“把某某 skill，用Github cli发布到github”

（前提是先配置好Github cli，不复杂）

等一会儿，Github就地址就有了。

![图像](assets/OpenCode安装教程，免费使用大模型，小白友好，开箱即用！/Image%2020.jpg)

乔帮主通用设计美化Skill

> [https://github.com/joeseesun/claude-designer-skill](https://github.com/joeseesun/claude-designer-skill)

## 推荐一些Skills

Anthropic官方Skills

> [https://github.com/anthropics/skills](https://github.com/anthropics/skills)

ComposioHQ 提供的Awesome Skills列表

> [https://github.com/ComposioHQ/awesome-claude-skills/tree/master](https://github.com/ComposioHQ/awesome-claude-skills/tree/master)

不过，上面的太大路货了。

再给几个我用过觉得不错的。

Superpowers

1.6万Star的Skill精选，从脑暴、写需求文档、开发、测试全包含，口碑相当好。

> [https://github.com/obra/superpowers](https://github.com/obra/superpowers)

Planning-with-files

作者Ahmad看 Manus 被20亿美元收购，参考Manus的Agent方法写的Skill。

很适合多步骤任务，用这个Skill指导其他Skill工作也挺好。

AI也需要有计划性，写TodoList，完成Check，不止于遗忘和跑偏。

X-article-publisher-skill

王树义老师写的X文章发布Skill。

调用Chrome浏览器，自动把文字和图片粘贴到编辑器，还能自动化根据文本定位插入图片。

> [https://github.com/wshuyi/x-article-publisher-skill](https://github.com/wshuyi/x-article-publisher-skill)

这个Skill非常值得学习，改造成各种自动发布工具。

NotebookLM skill

也是控制Chrome浏览器，自动上传PDF、Youtube链接到NotebookLM，程序化提问获取答案，对学习相当有帮助。

最强的是，还能记住登录信息，非常值得研究。

> [https://github.com/PleasePrompto/notebooklm-skill](https://github.com/PleasePrompto/notebooklm-skill)

## 写在后面

**OpenCode + OMO + Skills，这套组合拳真的很香。**

从安装到使用，全程不到半小时就能上手。

免费内置模型差不多就够用。

最重要的是，**它让AI编程的门槛降到了前所未有的低度。**

不需要懂复杂的配置，不需要折腾环境。

一句话安装插件，一句话调用Skill，一句话完成任务。

现在，AI工具竞争已经不是谁的模型更强，而是**谁能让普通人更容易用上这些能力。**

OpenCode做到了这一点。

它不是最强的，但可能是**最友好的**。

如果你之前因为账号、费用、技术门槛等问题，一直在AI编程的门外徘徊。

那么现在，**门已经为你打开了。**

进来试试，你会发现 AI 世界比想象中更精彩。