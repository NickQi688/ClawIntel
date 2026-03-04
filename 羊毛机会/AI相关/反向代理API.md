---
title: "Thread by @idoubicc"
source: "https://x.com/idoubicc/status/2004848130693759213"
author:
  - "[[@idoubicc]]"
published: 2025-12-27
created: 2026-01-22
description:
tags:
  - "clippings"
---
**idoubi** @idoubicc [2025-12-27](https://x.com/idoubicc/status/2004848130693759213)

分享一个很棒的开源项目：Antigravity Tools

这是一个把 Antigravity 里面的模型转成标准 API，给 Claude Code 等 Coding Agent 接入的智能代理项目。提供多账号管理、协议转换和智能请求调度等功能，让你能稳定、低成本地在 Claude Code、Codex 中使用 gemini / claude 系列模型。

如何使用？

1\. 访问 Antigravity Tools 代码仓库，按照指示安装 Antigravity Tools 桌面软件

2\. 在 Antigravity Tools 桌面软件添加账号，打开浏览器通过谷歌账号登录 Antigravity

3\. 在终端配置环境变量，让 Claude Code 使用自定义的 API 端点

export ANTHROPIC\_API\_KEY="sk-xxx"

export ANTHROPIC\_BASE\_URL="http://127.0.0.1:8045"

4\. 打开 Claude Code 发送指令，开始使用 CC

有哪些限制？

在 Antigravity Tools 里可以添加多个 Google 账号，每个账号都有一定的 Antigravity 模型额度，如果额度不够了，可以点击切换账号，智能切换到额度足够的账号。

可以为你添加的账号升级 Antigravity 高级套餐，获得更高的额度，既能在 Antigravity 编辑器使用，也能在 Claude Code、Codex 使用，相当于一次充值，同时分配给多个编程智能体用。

可以用哪些模型？

Antigravity 免费账号主要支持的是 gemini / claude 系列模型，不支持 gpt 模型，如果在 Codex 接入，需要加一个模型映射，比如把 gpt-5-codex 映射到 gemini-3-pro-high

这个项目目前只提供桌面版软件，不支持 Web 应用，不能通过服务器部署做 API 中转站，仅供自己在本地使用，一定程度降低了对 Claude、ChatGPT 的账号依赖，仅需一个 Google 账号，即可使用 Antigravity、Claude Code、Codex、Gemini Cli 等编程智能体。

有兴趣的可以试试。👇

![图像](https://pbs.twimg.com/media/G9KmrpWbwAAZamk?format=jpg&name=large)