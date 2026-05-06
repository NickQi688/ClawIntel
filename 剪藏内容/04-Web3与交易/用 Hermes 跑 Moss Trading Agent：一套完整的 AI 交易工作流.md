---
title: "用 Hermes 跑 Moss Trading Agent：一套完整的 AI 交易工作流"
source: "https://x.com/MossAI_CN/status/2046484110731088046"
author:
  - "[[@MossAI_CN]]"
published: 2026-04-21
created: 2026-04-22
description: "前段时间我们的创始人 Min @zeroxmin 做了一个实验。用同一个大模型、同一个 Skill、同一段 BTC 数据，分别让 Hermes Agent 和 OpenClaw 去做交易策略的回测和实盘。结果：Hermes 在 Moss 实时模式上的 PnL 是 OpenClaw..."
tags:
  - "clippings"
---
![图像](https://pbs.twimg.com/media/HGaQhUobsAAxla_?format=jpg&name=large)

前段时间我们的创始人 Min [@zeroxmin](https://x.com/@zeroxmin) 做了一个实验。

用同一个大模型、同一个 Skill、同一段 BTC 数据，分别让 Hermes Agent 和 OpenClaw 去做交易策略的回测和实盘。

结果：Hermes 在 Moss 实时模式上的 PnL 是 OpenClaw 的 3.4 倍。

同样的 Skill（Moss Trade Bot Factory），同样的模型（GPT-Codex API），Agent 框架不同，交出来的策略质量差了这么多。

但今天这篇文章是想聊一个更实际的问题：**如果你已经在用 Hermes，怎么用它跑 Moss 的交易 Agent？整套工作流是什么样的？**

# 先搞清楚：Hermes 和 Moss 各自做什么

Hermes 和 Moss 在这套工作流里的角色完全不同。

**Hermes 是你的 Agent 运行环境。**

它跑在你的机器上（本地、VPS、Docker 都行），提供终端操作、文件管理、模型调度、跨会话记忆、Skill 系统。它支持 200+ 模型（Claude、GPT、GLM、Gemma 4、任何 Ollama 本地模型），6 种运行后端，15+ 个通讯平台网关。它什么都能做——写代码、做研究、自动化工作流。

**Moss 提供交易引擎。**

策略生成（从自然语言推导 30+ 参数）、五维信号融合引擎（趋势/动量/均值回归/成交量/波动率）、对齐 Hyperliquid 真实环境的回测（手续费、滑点、资金费率）、策略进化（±30% 约束的周度反思）、实时模式和排行榜。

连接两者的桥梁是一个叫 [Moss Trade Bot Factory苔藓交易机器人工厂](https://clawhub.ai/fei-moss/moss-trade-bot-factory) 的 Skill。装上这个 Skill 之后，Hermes 就拥有了把自然语言转化成可执行量化参数的能力，然后把参数交给 Moss 的引擎去回测和执行。

用一个比喻：Hermes 是操作系统，Moss Trade Bot Factory 是你装的 App，Moss 平台是这个 App 连接的交易所。

# 整个工作流长什么样

![图像](https://pbs.twimg.com/media/HGaQwOhbcAAasHC?format=jpg&name=large)

## 第一步：装 Hermes

curl -fsSL [https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh](https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh) | bash

安装向导会自动启动。选 Quick Setup，配好你的模型。如果你想省钱，用 Ollama + Gemma 4 本地跑，零 API 费用。想要最强推理能力就接 Claude 或 GPT-Codex 的 API。

**验证安装：**

hermes doctor hermes chat -q "Hello, what tools do you have?"爱马仕医生 hermes chat -q “你好，你们有哪些工具？”

## 第二步：安装 Moss Trade Bot Factory Skill第二步：安装 Moss Trade Bot Factory 技能

这是关键的一步，这个 Skill 让 Hermes 具备了创建交易 Agent 的能力。

装好之后，Hermes 就能理解交易相关的自然语言指令，把你的策略描述转化成一整套量化参数：杠杆、方向偏好、入场阈值、止损倍数、信号维度权重……30+ 个参数全部自动生成。

## 第三步：描述你的策略

在 Hermes 的对话界面里，直接用自然语言描述你想要的交易风格：

**“我判断后续 BTC 会进入震荡行情，需要一个基于短时信号** **做多空双向操作的 trading agent，目标收益率在 100% 以上。”**

Hermes 会调用 Moss Trade Bot Factory Skill，开始生成参数、跑回测、迭代优化。

## 第四步：迭代和进化

这是 Hermes 真正拉开差距的地方。

在 Min 的实验里，Hermes 跑了 5 大轮迭代。它先做了 70 组随机参数探索（跳出局部最优），从中选出种子参数，然后对"进化规则本身"做了 22 套 schedule 的二次搜索。这是在元层面搜索最优的优化策略。

这就是 Hermes self-improving 机制在交易场景下的具体表现：它不只是在调参数，它在调"怎么调参数"的方法本身。

## 第五步：部署到 Moss 实时模式

参数优化完成后，把最终的参数文件上传到 Moss 平台的实时模式。你的 Agent 就开始在 Moss 上用真实行情数据运行了——所有交易记录和收益数据在排行榜上公开可见。

# 这套组合比单独用 Moss 网页版多了什么

大部分用户直接用 Moss 的 Hosted Agent（网页版托管）就够了。几分钟创建，24/7 运行，不需要装任何东西。

但 Hermes + Moss 的组合给了你几个额外能力：

## 1\. 更深度的策略搜索

Hosted Agent 的策略生成是"一次性"的——你描述策略，AI 生成参数，跑一次回测。想改就修改描述或手动编辑参数，再跑一次。

Hermes 的做法不同。它会自主进行多轮迭代——随机搜索跳出局部最优、分段回测分析失败原因、调整进化规则本身。Min 实验里 Hermes 的 5 轮迭代深度远超手动调参。

如果你追求策略的极致优化，Hermes 的自主迭代能力是更优秀的。

## 2\. 跨会话记忆

Hermes 的 memory-wiki 和跨会话搜索是非常好的功能。你三周前说过"我不喜欢在非农前开仓"，三周后它还记得。你上个月测试了五个策略，这个月问它"上次哪个策略回撤最低"，它能翻出来告诉你。

你跟 Agent 的协作可以积累。Agent 越用越懂你。

## 3\. Skill 自动化

你每周重复的策略研究流程：跑回测、看指标、调参数、对比结果，Hermes 会自动把这些操作抽象成可复用的 Skill。做过三次之后，第四次你只要说"帮我做每周策略复查"，它自动执行整个流程。

## 4\. 模型自由度

Hermes 让你自己选模型：策略生成用 Claude（推理最强）、日常查询用 GLM 5.1（便宜 3 倍）、简单检查用本地 Gemma 4（零成本）。一个 hermes model 命令就能切换。

交易执行不受影响。因为执行层是 Moss 的确定性数学引擎，跟用什么 LLM 无关。LLM 只负责生成和优化参数，不参与实际的买卖决策。

![图像](https://pbs.twimg.com/media/HGaR1LkaEAEo0NT?format=jpg&name=large)

# Min 实验里几个值得注意的细节

虽然不想重复整篇实验报告，但有几个发现对所有用 Hermes 做交易 Agent 的人都有参考价值：

![图像](https://pbs.twimg.com/media/HGaR8BvbAAAA2gO?format=jpg&name=large)

## 1\. 搜索策略决定了策略质量

同一个 Skill、同一个模型，Hermes 用随机搜索 + 元搜索跳出了局部最优，最终回测收益 +157%。对照组只做线性微调，回测 +21%。差距来自"怎么搜索"，不是"搜索了多久"。

## 2\. 参数文件的打包方式影响实盘表现

Hermes 生成的参数文件只包含策略本体（信号权重、阈值、止损倍数），没有写死 timeframe 和 symbol。环境变量留给平台推断。这种策略和部署环境分离的设计让参数在不同时间框架下都有复用空间。

## 3\. 回测验证的是 Agent 能力，不是策略收益

Min 测试用的回测数据是 BTC 从 $123K 跌到 $68K 的单边下跌行情。回测数字本身不重要，重要的是 Agent 在恶劣条件下能不能走完整个工程流程：迭代、反思、交付可信的产物。实盘才是最终考官。

## 4\. 产物诚信度是交易 Agent 的生命线

Min 用 Claude Cowork 交叉验证了两个 Agent 的所有文档和数据文件。Hermes 的每一轮数据都对得上。这一点在交易场景下尤其关键。如果你基于错误的历史数据做决策，后面每一步都会错。

# SOUL.md 和策略描述：同一个概念的两种形态

如果你用过 Hermes，你一定知道 SOUL.md。

系统提示的第一个插槽，定义了 Agent 的"灵魂"：它是谁、怎么思考、怎么沟通。

Moss 的策略描述做的是同一件事，场景换成了交易。

你写的"稳健趋势追踪，20-30x 杠杆，偏多头"，本质上就是你的交易 Agent 的 SOUL.md。

它定义了 Agent 的交易性格：偏好什么方向、承受多大风险、什么时候入场和退出。

Moss 把这些转化成两类参数：**性格参数**（锁定不变，相当于 SOUL.md 的核心身份）和**战术参数**（每周可进化 ±30%，相当于 Agent 在实践中积累的技巧）。

![图像](https://pbs.twimg.com/media/HGaSLaNbUAA6uIF?format=jpg&name=large)

用 Hermes + Moss 的组合，你的 Agent 有两层"灵魂"：

- **SOUL.md**（Hermes 层）——通用人格：怎么跟你沟通、怎么做研究、遇到不确定的事怎么处理
- **策略描述**（Moss 层）——交易人格：做什么方向、用多大杠杆、什么时候入场和退出

两层各管各的，互不干扰。

SOUL.md 不会影响你的交易参数，交易参数也不会改变你的 Agent 跟你对话的方式。

# 谁适合用 Hermes + Moss

Hermes + Moss 的组合适合这几类人：

## 1\. 你已经在用 Hermes 了

加一个 Moss Trade Bot Factory Skill 只是给现有的 Agent 多装一个能力。边际成本几乎为零。

## 2\. 你追求策略的极致优化

Hermes 的多轮自主迭代、随机搜索、元搜索，能探索到手动调参和网页版单次生成到不了的参数空间。

## 3\. 你想用特定的模型跑策略生成

Claude Opus、GLM 5.1、本地 Gemma 4——Hermes 给你选择权。

## 4\. 你想要完全的数据控制

所有数据、对话、参数文件都在你自己的机器上。

## 5\. 你是开发者，想定制交易流程

Hermes 的 Skill 系统 + Moss 的交易引擎可以组合出复杂的自动化——"每天凌晨 3 点跑回测，Sharpe 低于 0.8 自动调参数并通知我"。

如果你只是想用一句话创建一个 Agent 然后让它跑着，Moss 的 Hosted Agent 会更适合你。

# 一个正在成型的生态

AI Agent 赛道正在分层。

通用框架（Hermes、OpenClaw）解决的是Agent 怎么运行。比如环境管理、模型调度、记忆系统、Skill 学习。

垂直应用（Moss 做交易、其他项目做研究/客服/内容）解决的是Agent 做什么。比如专业领域的引擎、数据、执行逻辑。

两层的关系是共生。Hermes 做得越好，跑在上面的交易 Agent 体验就越好。Moss 上面跑的 Agent 越多，Hermes 在交易场景的 Skill 积累就越丰富。

Nous Research 做 Hermes 的时候大概没有想到会有人用它来跑交易 Agent。我们做 Moss 的时候也没有一开始就想到会跟 Hermes 组合。

但开放生态的魅力就在这里。你不需要预见所有的可能性，你只需要把接口做对。

欢迎来 Moss 试试看 → [https://moss.site/agent](https://moss.site/agent)