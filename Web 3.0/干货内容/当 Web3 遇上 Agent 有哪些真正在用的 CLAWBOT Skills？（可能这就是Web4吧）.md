---
title: "当 Web3 遇上 Agent 有哪些真正在用的 CLAWBOT Skills？（可能这就是Web4吧）"
source: "https://x.com/yushen686/status/2028387889738883145"
author:
  - "[[Unknown]]"
published: 2026-03-02
created: 2026-03-03
description:
tags:
  - "clippings"
---
> 梳理了当前 Web3 真正好用的 CLAWBOT Skills（链上、预测市场、Perp 、DEX 操作与检索情报），并给出安全隔离与组合编排建议，帮你把 Agent 从“会聊”变成“能用、可控、可复盘”的交易与研究助手。PS：赚到钱了，记得回来告诉我。

过去两年，Web3 的“操作面”越来越像一个**实时数据 + 交易执行 + 风险控制**的自动化系统： 你要盯链上资金流、盯情绪与新闻、盯跨链与滑点，还要在极短时间内完成决策与执行。CLAWBOT的发布使得该循环有可能打破。

在这个节点，**“AI Agent + Skills”会变得非常实用：你不再把 Agent 当聊天机器人，而是当一个可编排的 Web3 操作员**：

- 发现机会（Research / 情报）
- 验证信息（Onchain / 数据）
- 模拟与回测（Paper / Sandbox）
- 执行与风控（Trade / Alerts）
- 复盘与迭代（Post-mortem）

下面我整理一份**当前好用的 CLAWBOT Skills**清单（并穿插我建议的“组合打法”）。

## 零：先讲安全：别让“最热门技能”把你钱包也热更新了

在推荐清单之前，必须先把风险说透： 近期多家安全与媒体报道指出，ClawHub 生态出现过**伪装成加密/自动化工具的恶意 skills**，以窃取敏感数据（钱包、SSH、浏览器信息、API keys 等）为目标。**结论**：

```text
1. 不要在生产机器上直接安装“来路不明、要求你手动执行混淆命令”的 skill。
2. 把 Web3/交易类 skill 的运行环境做隔离：单独用户、单独容器/VM、最小权限、最小密钥。
3. 优先使用“只读数据类 / paper trading / 研究类” skills；涉及真实交易的一律加审计与审批。
```

一个很现实的信号来自“Top ClawHub Skills”榜单：下载量第一的 self-improving-agent 在榜单里被标注为 **Suspicious**。这就是典型的“下载量 ≠ 安全性”。

## 一、Web3 （或者4😂）里“最值得 Skills 化”的 5 类工作

我把 Web3 的 agentic 工作流拆成五类，你可以按团队需求选技能拼装：

1. **市场与情报**：新闻/社媒/研报/公告 → 可检索、可引用、可追溯
2. **链上数据**：地址资产、交易、DeFi 头寸、Gas、NFT、跨链
3. **交易执行**：DEX/Perp 下单、滑点与路由、仓位与 PnL
4. **模拟与训练**：paper trading、策略演练、复盘
5. **风控与合规**：权限隔离、密钥管理、skill vetting、审计日志

## 二、推荐技能清单（Web3 向）

**A. 钱包画像 & 多链资产/头寸：**

如果你只装一个“链上数据入口”，我建议从 Zerion 这类聚合 API 开始：

![图像](https://pbs.twimg.com/media/HCZBVulboAArVMl?format=jpg&name=large)

- 读取 EVM + Solana 的地址资产、交易、DeFi 头寸、Token 价格、NFT、Gas 等
- 特别适合做 **whale watch / smart money 跟踪 / 地址分群 / 资金流监控**

**典型用法**：

- “给我 20 个 DEX 热门路由里出现频次最高的地址画像”
- “筛出过去 24h 在 Base / Solana 上净流入最大的地址，并按标签聚类”

**B. 合约/Perp 执行与仓位监控：Hyperliquid 相关技能**

如果你的团队做高频/半自动执行，Perp 的“可编排性”往往比现货 DEX 更高（接口更稳定、风控更清晰）。

两条很实用的路线：

**1）hyperliquid-cli（带 HIP-3）**

- 说明里写得很直白：可在 Hyperliquid 上交易 crypto/股票/指数/大宗，并提供实时仓位 & PnL 跟踪等。

![图像](https://pbs.twimg.com/media/HCZBmWUagAAZhiD?format=jpg&name=large)

**2）coinpilot-hyperliquid-copy-trade（复制交易）**

- 面向“跟单 + 研究”的自动化：发现并镜像链上高手交易，强调低延迟执行。

![图像](https://pbs.twimg.com/media/HCZBgo4aYAAvwrC?format=jpg&name=large)

**典型用法**：

- “监控我关注的 50 个 trader，一旦出现同向集中开仓，用 paper 先跑一遍，再给我执行建议”
- “把 DEX 上某币的流动性变化，映射到 Perp 的仓位风险提示”

**C. 预测市场（情绪与叙事的量化接口）：Polymarket 系列**

Polymarket 的价值在于：它经常比 Twitter 更早“价格化”叙事。

我推荐两种颗粒度：

- **polymarket-odds / Polymarket Odds**：查询市场赔率与事件（偏数据读取）。

![图像](https://pbs.twimg.com/media/HCZEfyEbgAEvpuN?format=jpg&name=large)

- **Polymarket Paper Trader**：用 10k 纸资金练手、零风险，适合把 agent 流程跑通再上真金白银。

![图像](https://pbs.twimg.com/media/HCZEpKLa0AA-tNA?format=jpg&name=large)

**典型用法**：

- “如果某类事件的 implied probability 在 2h 内跳变 > X%，触发链上相关赛道 token 的 watchlist 更新”
- “用 paper trader 先验证信号，再决定是否通过 DEX / Perp 执行”

**D. DEX 操作（以 Uniswap 为代表）：uniswap**

![图像](https://pbs.twimg.com/media/HCZEug2bkAA-ylf?format=jpg&name=large)

Uniswap skill 在 ClawHub 上有收录，定位是辅助 swap、LP 与避免常见 DeFi 损失。 这类技能的正确打开方式不是“让 agent 盲签交易”，而是：

- 让它做**路由解释、滑点建议、LP 风险提示、操作 checklist**
- 真正签名/执行交给你受控的钱包与审批流

**E. “信息获取能力”是 Web3 Agent 的底座：Tavily Web Search**

![图像](https://pbs.twimg.com/media/HCZEyu1aMAA0AdN?format=jpg&name=large)

很多人做 Web3 agent 会直接上“链上执行”，结果死在信息差。 更稳的策略是：先把 agent 变成一个**会检索、会引用、会反证**的研究员。

在 Top ClawHub Skills 的榜单里，**Tavily Web Search**拿到 Weekly Winner，并展示了明显的下载增长。 这类 skill 特别适合：

- 新币/新叙事的“多源交叉验证”
- 安全事件/协议风险的快速尽调
- 链/项目方公告的追踪归档

## 三、把这些 skills 组装成适配的 3 套作战编排

**A. 编排 1：Alpha 发现（叙事 → 链上验证）**

1. Tavily Web Search 拉取事件/叙事
2. Polymarket Odds 量化情绪变化
3. Zerion API 追踪 smart money 地址的仓位/资金流 输出：一份“可追溯”的信号报告（附来源与链上证据）

**B. 编排 2：执行前的安全沙盒（避免一脚踩进恶意技能）**

1. Paper Trader 跑策略（不碰真钱）
2. 交易类技能只跑“建议与检查清单”，不自动签名
3. 真执行走你自己的审批/多签/限额系统

**C. 编排 3：Perp 做风控对冲（DEX 现货 + Perp 风险管理）**

1. DEX / 链上现货作为“方向与叙事敞口”
2. Hyperliquid 侧做对冲与仓位管理（PnL、强平距离、风险提示）

## 四、写在最后

- **把 skills 当成“供应链依赖”管理**：版本锁定、hash 校验、review 流程、最小权限。
- **强制隔离密钥**：交易私钥/所 API key 不进 agent 工作目录；只给短期、可撤销的 token。
- **优先装“只读型”技能**：研究、检索、链上查询、paper trading —— 先把流程跑顺。
- **下载量只当线索，不当信任**：榜单里都能出现 “Suspicious” 的头部技能，这已经说明问题。

本文提到的所有Skill已放到GitHub并实时更新：

[https://github.com/bosshuman/awesomeSkills](https://github.com/bosshuman/awesomeSkills)

🧡觉得还不错就点个关注吧 [@yushen686](https://x.com/@yushen686)