---
title: "Thread by @_0xKenny"
source: "https://x.com/_0xKenny/status/2033039918016897411"
author:
  - "[[@_0xKenny]]"
published: 2026-03-14
created: 2026-03-15
description:
tags:
  - "clippings"
---
**Kenny.eth** @\_0xKenny 2026-03-13

过去两周，AI 开源圈最容易让人上头的事情，是每天都有新项目冒出来、每天都有新的 GitHub 热门榜、每天都有人在喊"这个会改变一切"。

但真正值得花时间盯的项目，其实并不多。

1\. MiroFish

https://github.com/666ghj/MiroFish

这是最近最容易被当成"神项目故事"消费掉的一个。20 岁学生、10 天、GitHub 冲榜、融资，这些都很吸睛。但如果只看到故事，就会错过它真正重要的方向：它不是在做普通 Agent，而是在做数字社会仿真。

知识图谱、多 Agent、长期记忆、可注入变量的 God View，这些东西组合起来，意味着它正在逼近一个更大的方向 - 把现实世界中难以直接做实验的复杂系统，改造成可以反复推演的数字沙盘。对宏观、市场、舆情、组织行为这类问题来说，这条路线非常值得长期盯。

2\. OpenClaw-RL

https://github.com/Gen-Verse/OpenClaw-RL…

这类项目的价值，不在于"又给 Agent 加了 RL"，而在于它开始认真回答一个真正重要的问题：Agent 能不能在真实使用过程中持续学习，而不是训练完就冻结？

如果未来 Agent 真正的护城河，不是初始模型能力，而是谁更会学、谁越用越像你，那 OpenClaw-RL 这种方向就不会只是研究型项目，而会是未来 Agent runtime 的基础设施雏形。

3\. gstack

https://github.com/garrytan/gstack

这不是普通的 prompt 包，而是把 Claude Code 从单脑助手拆成多角色工程团队的一次工程化尝试。Founder 脑、Eng 脑、Reviewer 脑、QA 脑，背后对应的是一个更成熟的工作流观念：复杂任务不是靠一个万能 AI 一路干到底，而是按阶段切换不同认知模式。

4\. agent-cli

https://github.com/Nunchi-trade/agent-cli…

如果说很多交易 Agent 还停留在会下单、会看行情的 demo 层，agent-cli 已经明显在往更完整的交易操作系统靠。策略、调度、风控、复盘、自我调参、MCP、OpenClaw 集成，都被装进了一套可编排框架。

它真正展示的，不是"AI 也能交易"，而是：高价值垂直 Agent 的未来形态，很可能不是一个聊天机器人，而是一个严肃执行系统，前面再接上可对话、可调度、可组合的智能入口。

5\. OpenClaw402

https://github.com/NoFxAiOS/openclaw…

这可能是最近最容易被低估的一个方向。很多人以为它只是又一个 OpenClaw fork，但它真正碰的不是 UI，而是经济层。

它试图把 Agent 的默认支付方式从 API key 改成钱包和按次支付：用户不再先去配 OpenAI/Anthropic key，而是每次调用时自动用 USDC 完成结算。这个方向如果跑通，可能把 Agent 产品从开发者工具逻辑，推向消费者产品逻辑。

6\. opencli

https://github.com/jackwener/opencli…

这个项目做的事情非常干净：把任何网站直接变成 CLI 命令行工具。

bilibili、知乎、小红书、Twitter、Reddit、GitHub、HackerNews、YouTube、Boss 直聘……28 个以上的命令，覆盖 16 个主流平台，复用 Chrome 登录态，账号密码从不离开浏览器。

它对 Agent builder 来说特别有意思：大量网站没有官方 API，但 opencli 通过 AI 驱动的 API 发现 + YAML 声明式适配器，让任意网站都可以变成可编程的数据源。这件事一旦跑通，意味着 Agent 的信息获取层会大大降低集成成本。

7\. sub2api

https://github.com/Wei-Shaw/sub2api…

这是一个很直接地戳中了真实需求的项目：你有 Claude Pro 订阅、有 OpenAI Plus 订阅，但你想把这些订阅的 quota 统一分配、多人拼车共享、精确到 token 计费。

sub2api 做的就是这件事：把各类 AI 订阅接入统一 API 网关，支持多账号调度、并发控制、限速、token 级计费、管理后台。技术栈 Go + Vue3 + PostgreSQL + Redis，有一键安装脚本，生态里已经有第三方支付插件和移动端管理 App。

增长会快，是因为"AI 订阅成本摊薄"这个需求不是小圈子需求，而是所有重度使用者都会面对的现实问题。

8\. Page Agent

https://github.com/alibaba/page-agent…

它不是做一个新的 AI App，而是在试图改写"网页"这层界面本身：让现有页面直接变成 AI 原生交互环境。因为未来谁控制界面层，谁就更接近控制用户的默认工作入口。

9\. bb-browser

https://github.com/epiral/bb-browser…

浏览器执行层本身就是一条非常大的赛道。Agent 想真正接管现实工作，浏览器永远是绕不过去的战场。谁能把浏览器控制、页面理解、动作稳定性做成可用层，谁就会在下一阶段的 Agent 基础设施里占到关键位置。bb-browser 还在快速迭代中，值得持续跟进。

10\. BotLearn / SkillHunt

https://botlearn.ai/skillhunt

几乎所有人都在卷执行层的时候，它在尝试回答一个更稀缺的问题：人和 Agent 到底该怎么一起学习、一起积累技能、一起变强。如果未来真正的差距不只是"谁会用 Agent"，而是"谁会设计一套人和 Agent 共学的系统"，那这种项目会越来越重要。

> 2026-03-13
> 
> 过去两周，GitHub上增长最快的AI开源项目盘点（除OpenClaw外）：
> 
> Agency Agents — 35K+
> 
> 把Claude Code一键变成51位AI专家+9大部门的完整团队，从产品、开发、设计到营销、社媒、QA全流程覆盖。相当于免费雇了一整家AI公司。
> 
> https://github.com/msitarzewski/agency-agents…
> 
> Auto Research — 25K