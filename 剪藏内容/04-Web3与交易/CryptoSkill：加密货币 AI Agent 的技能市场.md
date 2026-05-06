---
title: "Post by @hardriver on X"
source: "https://x.com/hardriver/status/2047223595122962907"
author:
  - "[[@hardriver]]"
published: 2026-04-23
created: 2026-04-24
description: "发现一个对 AI Agent + Crypto 玩家来说，可能会天天用到的好东东。CryptoSkill —— 加密货币 AI Agent 的技能市场。https://cryptoskill.org先说它是什么：你的 AI Agent 想操作链上资产，需要了解各种协议。以前的做法"
tags:
  - "clippings"
---
发现一个对 AI Agent + Crypto 玩家来说，可能会天天用到的好东东。  
  
CryptoSkill —— 加密货币 AI Agent 的技能市场。https://cryptoskill.org  
  
先说它是什么：  
  
你的 AI Agent 想操作链上资产，需要了解各种协议。  
  
以前的做法：自己写集成代码，或者找各家 API 文档挨个读、挨个对接。  
  
现在的做法：去 CryptoSkill 找对应的 Skill，三步装好，Agent 直接会用。  
  
它本质上是一个开源技能注册表——类比 npm，但装的是让 AI Agent 操作加密货币的能力。  
  
现在里面有什么：  
  
1⃣ 1198+ 个 Skills，覆盖 13 个类别

2⃣97 个 MCP Server（标准化 AI Agent 工具接口）

3⃣ 23 个官方认证项目，含 Binance、OKX、Kraken、Coinbase、Uniswap、MetaMask、Circle(USDC)、DefiLlama……  
  
光 Kraken 官方就贡献了 50 个技能，覆盖现货、期货、套利策略、DCA 等 。  
  
13 种分类，不是在凑数：  
  
🏦 交易所（185个）| ⛓️ 公链（63个）| 🏗️ DeFi（245个）

📊 数据分析（122个）| 📈 交易策略（117个）| 🎯 预测市场（66个）

💳 支付（85个）| 🤖 AI × Crypto（79个）| 🔌 MCP Server（97个）  
  
DeFi 类 245 个 Skill，自然语言转链上操作，Nethermind 的那个 Skill 直接打通 13 个 DeFi 协议。  
  
怎么用，真的很简单：  
  
Claude Code 用户复制执行如下指令——  
  
git clone https://github.com/jiayaoqijia/cryptoskill.git… /tmp/cs  
  
cp -r /tmp/cs/skills/exchanges/binance-spot-api .claude/skills/  
  
OpenClaw 用户复制执行如下指令——  
  
clawhub install binance-spot-api  
clawhub 安装 binance-spot-api  
  
装完，你的 Agent 就会操作 Binance 了。  
  
MCP Server 版 ——  
  
claude mcp add 直接调起。  
Claude mcp add 直接调用即可。  
  
兼容 Claude Code、OpenClaw、Codex、Cursor，以及所有支持 SKILL.md 格式的框架。  
  
有几个让我觉得这东西打磨得很认真的细节：  
  
▸ 每 6 小时自动扫描 128+ 个项目，更新技能库

▸ 所有新提交的 Skill 都经过安全扫描（检测恶意代码、私钥盗取等）

▸ 官方 Skill 来自项目方的官方 GitHub 仓库，有明确的 ✓ 认证标识

▸ 完全开源，AGPL-3.0，代码在 GitHub 上全部可审计  
  
我的看法：  
  
AI Agent 操作加密货币，正在从“能不能做”进入“谁的工具链更完整”的竞争阶段。  
  
CryptoSkill 做的事情，是把这个工具链标准化、可搜索、可复用。  
  
它现在的状态有点像早期的 npm——东西还在快速增加，质量参差不齐，但方向是对的，而且是行业里目前做得最系统的一个。  
  
如果你在搭建专属于自己的 AI + Crypto 相关的 Agent，值得收藏。  
  
NFA，工具分享，自行判断。