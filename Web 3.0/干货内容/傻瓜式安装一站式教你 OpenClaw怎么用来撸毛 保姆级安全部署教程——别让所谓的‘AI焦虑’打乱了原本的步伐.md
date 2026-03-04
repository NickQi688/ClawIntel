---
title: "傻瓜式安装一站式教你 OpenClaw怎么用来撸毛 保姆级安全部署教程——别让所谓的‘AI焦虑’打乱了原本的步伐"
source: "https://x.com/a8club88/status/2025741190122049894"
author:
  - "[[Unknown]]"
published: 2026-02-23
created: 2026-02-24
description:
tags:
  - "clippings"
---
**一、先祛魅：龙虾根本不是印钞机**

先说结论：


## 📚 相关文章

- [[openclaw神级技能Simmer实测：我不写一行K线代码，让AI跑赢预测市场]] - Simmer 工具详细评测，AI 预测市场实战指南
- [[自动化交易软件推荐]] - 自动化交易工具汇总
- [[../../AI协作/OpenClaw_qmd使用指南]] - OpenClaw 专属的 qmd 本地语义搜索完全指南
- [[../../学习&AI应用/编程相关/openclaw/openclaw教程资源合集]] - OpenClaw 教程资源合集
- [[../../学习&AI应用/编程相关/openclaw/手把手教你把 Claude Code 改造成免费的强化版 openclaw 🦞（附完整步骤）]] - Claude Code 改造教程

---

OpenClaw（龙虾）本质上是一个“远程自动执行框架”，你把它理解成可以全面接管你电脑的机器人，这个机器人没有大脑，它只听指令（指令来自你或者你给他链接的ai大模型），它并不是交易策略。

在推特很多人在说：

“龙虾自动帮我打土狗”、“龙虾一天赚 20%”、“龙虾替我盯盘”、“15分钟部署，躺赚”等等。

但你自己真的使用过之后会发现，根本不是那么回事，OpenClaw 的本质是：

一个通过你订阅的大模型 / Telegram / 你个人远程控制指令，来接管你电脑，替你操作和执行的工具。

它可以：打开你浏览器（需要插件）/帮你自动执行脚本（需要环境）/帮你发送交易指令（需要插件）/帮你监听信号（需要插件）/帮你自动下单（需要插件）等等。

但它不会：替你赚钱/替你设计盈利策略/替你判断市场/替你选币。

这就好像我们使用okx里的交易策略是一样的，你自己制定策略或者使用ai给你的策略，okx帮你自动执行了而已，是否赚钱，取决于你的策略，okx只是自动化工具。

讲到这里，逻辑就非常清楚了：

策略决定盈利-龙虾只是代替了你的手的执行器-如果你策略是垃圾-龙虾只会帮你亏钱。

如果你策略真的有效-龙虾只是帮你自动化而已。

推特上那些所谓的赚钱了，大多数还是蹭流量，当然不排除顶级大神能做到，但99%的人，很难。

把账户钱包秘钥交给龙虾让他自己跑，是否能赚钱，核心还是要看你给龙虾的策略部署是什么，如果根本没策略，让ai大模型给他提供策略，这样是赚是赔，完全看你使用的ai大模型的能力，和龙虾本身无关，如果你的ai能帮你赚钱，没有龙虾你也可以赚钱。

看到这里，如果你没有被劝退，如果你还想继续折腾，请往下看：

**二、所谓的“15分钟部署教程”，基本你无法实现。**

我实际踩坑几天，总结下来：

一个撸毛人的OpenClaw 部署会涉及到Docker、Gateway token、Device pairing、WebSocket 鉴权、浏览器 localStorage、Docker 挂载目录、LAN 绑定、CLI 管理、Telegram 接口、模型接入（如果接 GPT / Gemini）等诸多方面。

任何一个环节出问题，你就会看到各种1008 pairing required、token mismatch、Health Offline、Schema unavailable、disconnected from gateway等一系列让你崩溃的报错。

为了解决这些问题，上一周我的Gptplus已经干冒烟了，浏览器卡崩溃，多个对话框都没办法正常回答问题了。

而推特上所谓的15分钟的部署教程：

只演示他们已经部署成功的环境、不讲安全机制、不讲鉴权机制、不讲 pairing 机制、不讲 token 机制、不讲容器数据持久化、不讲设备 identity、不讲等等。。。

就像马云和你说，想赚钱你就先开个公司一样，撸毛人照抄必炸。

群里经常有人会问，部署一个龙虾成本高吗？这里回答一下：

1、如果你有闲置电脑，那么0成本

2、如果你不怕风险，部署到自己的电脑上，那么0成本

3、唯一需要花钱的，就是你需要有一个ai大模型来驱动你的龙虾

**三、适合一个撸毛人真正的 OpenClaw 架构是什么？**

我们知道龙虾会无限权限的接管我们的电脑，你电脑里存放的钱包插件/.env密钥/记事本备忘录里的账号等等信息，都会被龙虾一览无遗，如果你的龙虾被黑了，那么你就可以原地送外卖了。

所以，安全性是我们撸毛人考虑部署龙虾的第一要素。如果你说我新买一台mac mini纯玩龙虾，那么你可以跳过，如果你和我一样，没有多余的设备又想尝试一下新鲜事物，那么往下看：

由于 OpenClaw 通常需要读取私钥或 API Key，而且通常会配置很多复杂的开源依赖环境中（非常容易遭受供应链攻击），所以我们采用将龙虾封装到容器里，建立一道屏障，来保障资金和信息安全。

容器的意思就是我们在电脑上创建了一个极其精简的 Linux 虚拟内核环境。把 OpenClaw 关进去，它眼中的“世界”只有你分配给它的那几个文件夹。它根本看不见你的电脑上的钱包插件和 .env 等重要文件。

我们可以通过 Docker 的网络配置，来限制容器只能访问特定的域名。通过api的权限来控制龙虾的控制权，即便某些龙虾插件脚本偷到了某些数据，只要你封锁了它向外发送数据的“非官方路径”，黑客也拿不到东西。

**四、真正的保姆级部署流程（一步一个坑）**

以我的mac mini示范 以下是干净环境从 0 开始。

前提：Google搜索 OrbStack， 下载并安装它。

![图像](https://pbs.twimg.com/media/HBwOd-KbQAAKUIh?format=png&name=large)

安装后打开。 OrbStack 会自动利用mac原生的虚拟化框架。

准备好容器，我们可以开始部署openclaw了

安装Openclaw

这里我没选择用官网的一键部署，可能是梯子的问题，下载到一半总是断，所以我选择了使用github的镜像，小伙伴可以先用主网一键部署试试：打开openclaw.ai 往下翻找到quick start部分，复制命令到终端运行即可

回到我的方法，既然是下载镜像，那么需要一个叫 git 的工具。

1、打开你的终端。

2、输入

git --version

这里是检查一下你的电脑中有没有这个工具，如果显示版本号，跳过下一步。

如果提示没安装，则输入安装：

brew install git

(如果提示你没装 Homebrew，就去官网下个 Git 安装包，但这通常是程序员和交易员必备的)。

3、把 OpenClaw 下载进电脑。（需要开梯子，不然容易断）

输入以下代码：

Bash

\# 进入你的个人主目录

cd ~

\# 创建一个专门放交易工具的文件夹

mkdir -p CryptoTools

cd CryptoTools

\# 从 GitHub 克隆项目（这就是真正的“下载”）

git clone [https://github.com/openclaw/openclaw.git](https://github.com/openclaw/openclaw.git)

\# 进入项目文件夹

cd openclaw

![图像](https://pbs.twimg.com/media/HBwOmiDasAAPOPV?format=png&name=large)

然后就会显示正在下载。。。

下载完成后 进入目录

cd openclaw

因为我们是在容器里运行openclaw 所以首先要给 Docker 指路

在终端里直接粘贴运行下面代码，这会告诉 OpenClaw 把配置文件和工作区存在当前目录下：

Bash

echo "OPENCLAW\_CONFIG\_DIR=./.openclaw" >> .env

echo "OPENCLAW\_WORKSPACE\_DIR=./workspace" >> .env

echo "OPENCLAW\_GATEWAY\_TOKEN=$(openssl rand -hex 16)" >> .env

这几行命令的作用：

1 指定 .openclaw 为配置文件夹。

2 指定 workspace 为工作目录。

3 安全加固： 随机生成一个 32 位的密钥作为网关令牌，防止别人黑进你的机器人。

然后确保你还在 openclaw 文件夹下，直接运行下面这行来打开龙虾：

Bash

docker compose run --rm openclaw-cli onboard

![图像](https://pbs.twimg.com/media/HBwOr_jagAAhjiD?format=png&name=large)

到这里 恭喜你 第一步做完了，龙虾已经安装到你的电脑中了。由于配置环境的区别，有的老电脑可能会有一些原因报错，但这里出现的都是小错误，ai就可以帮你解决。

然后我们选择yse-然后选择quickstart（快速设置）

然后要选择你要接入龙虾的模型。这里因为我买了智谱的coding套餐，可以使用glm模型和claude，我就先接入它了，后面链接成功以后可以用上面的命令重新再配置Gemini pro或者gpt等。

![图像](https://pbs.twimg.com/media/HBwOx4WaIAAqHlQ?format=png&name=large)

我选的是智谱的[Z.AI](https://z.ai/)

智谱的API进入官网我的apikey里生成一个就好了，跟你配置claude时候是一样的，如果是gpt或者其他ai大模型，可自行复制api。

![图像](https://pbs.twimg.com/media/HBwO3jQa4AAaGNo?format=png&name=large)

![图像](https://pbs.twimg.com/media/HBwO5dPbMAAzeCX?format=jpg&name=large)

黏贴好api后，回车，出现模型选项

依然用智谱举例，黏贴好api后选择模型，回车

然后会出现让你配置各种机器人控制接口，这里我们后续再说，先选择skip跳过。

![图像](https://pbs.twimg.com/media/HBwO821bIAExpth?format=png&name=large)

然后回车 选yes

![图像](https://pbs.twimg.com/media/HBwPC3OaIAAk3Tv?format=png&name=large)

这里也是配置插件，也先跳过，回头根据你自己的需求可再回来配置，按空格，回车。

![图像](https://pbs.twimg.com/media/HBwPI_9bMAAYp84?format=png&name=large)

后面是配置google到插件 一路no，一路回车，然后等待。

等一会就会出现这样的界面，记得保存你的地址和秘钥。

![图像](https://pbs.twimg.com/media/HBwPL_5bIAAGznw?format=png&name=large)

这是你访问龙虾的秘钥，保存好

![图像](https://pbs.twimg.com/media/HBwPN2ka0AAE5FB?format=png&name=large)

等程序跑完

按control+c退出 回到openclaw文件夹 输入

docker compose up -d

正式启动龙虾

![图像](https://pbs.twimg.com/media/HBwPRS1aYAADGCh?format=png&name=large)

到这里如果没启动，也基本是小问题，ai解决掉。

如果顺利启动，则马上验证一下龙虾的各个状态，终端输入：

docker compose run --rm openclaw-cli doctor

![图像](https://pbs.twimg.com/media/HBwPUnOaYAETYOi?format=png&name=large)

这里是锁死龙虾的权限

一路yes 看最后输出

我这里出现了个问题 网关没有跑起来

![图像](https://pbs.twimg.com/media/HBwPYXyb0AA2KnE?format=png&name=large)

小问题用ai解决，解决不掉的，多半是这个问题，之前给 Docker的指路没有生效，我们重新来一遍，在终端里直接粘贴运行这两行，这会告诉 OpenClaw 把配置文件和工作区存在当前目录下：

Bash

echo "OPENCLAW\_CONFIG\_DIR=./.openclaw" >> .env

echo "OPENCLAW\_WORKSPACE\_DIR=./workspace" >> .env

echo "OPENCLAW\_GATEWAY\_TOKEN=$(openssl rand -hex 16)" >> .env

然后再次启动龙虾

docker compose up -d

![图像](https://pbs.twimg.com/media/HBwPb9Ka0AA-SbU?format=png&name=large)

看到上图说明你启动成功了，如果还有报错也是ai解决掉。

然后打开浏览器，最好是一个无痕的浏览器，地址填写刚才让你复制的那个，然后回车，见证奇迹！

不出意外，应该是这样的，1008链接错误哈哈哈哈哈哈哈

![图像](https://pbs.twimg.com/media/HBwPgBuaYAAoNtr?format=png&name=large)

这里就是把我的gpt干冒烟的地方，无论用什么方法，都无法连接，此处大概使用了100种方法来验证，折腾了我大概4天的时间，最后查明真凶。

OpenClaw 拥有极高的安全机制。默认情况下，它只允许“真正的本机”免密登录。但我们把openclaw封装进 OrbStack了，浏览器请求经过 Docker 转发后，在网关眼里变成了一个外网 IP。 网关一看，以为是别人在远程黑你的服务器，它直接拉响警报，把我踢出去了（也就是报 1008 错误）。所以我们现在给他一块免死金牌，让他直接进来握手。

我们还在openclaw目录下，输入

nano ./.openclaw/openclaw.json

会打开一个编辑框

进去之后，用键盘上下键找到 "gateway": { 这一行。 在它正下方，手动敲入下面这三行（注意标点符号，全是英文状态下的）：

"controlUi": {

"allowInsecureAuth": true

},

加上之后，那部分看起来应该是这样的

![图像](https://pbs.twimg.com/media/HBwPj3iasAEiAka?format=png&name=large)

然后保存 退出，重启网关

docker compose restart openclaw-gateway

这时候 你再用刚才的地址登录浏览器，就能看到下图了：

![图像](https://pbs.twimg.com/media/HBwPnsrawAAFxgK?format=png&name=large)

如果还出现1008问题，基本就是网关没有握手成功，或者浏览器的token秘钥和龙虾的token秘钥不一致导致，ai可以解决。如果出现1006，则代表龙虾本身没跑起来或龙虾本身的配置的问题，ai解决。

到这里，我们的第一步就算基本完成了，我们来复盘一下，我们完成了

1、 通过镜像下载并安装的龙虾。

2、 建立了物理防线，把龙虾装进了防弹玻璃的小屋里。

3、 通过doctor的700命令，我们建立了一个绝对的“金库”未来我们授权给龙虾的api 钱包等信息，都锁死在这个金库里，只有最高管理员有权查看，其他的软件用户等都无权访问。

4、 给龙虾注入了大脑。（glm-claude）

5、 解决了orbstack的网络桥接机制。

![图像](https://pbs.twimg.com/media/HBwPrBcbIAAL6i7?format=png&name=large)

对比起市面上的一键部署，我们如此部署完了后，对撸毛人来说有巨大的优势

真正的沙盒隔离，通过Docker和Orbstack部署，openclaw被关起来了，即便未来有恶意代码的龙虾开源脚本，它也只能破坏容器内部，很难摸到你主机上的核心文件，另外我们明确配置了文件夹和工作区的位置，未来无论龙虾怎么升级，只要这两个文件夹还在，ai记忆，配置和脚本都不会丢。

至此，我们完成了龙虾最核心、也是最容易被忽视的‘安全地基’建设。

当然，以上的部署安全级别大概是个7分左右吧，足够防范误操作，小白脚本等了，由于面对的小伙伴大多数是对架构的理解都是小白阶段，秉着简单可操作先连同的思路，并没有在所有细节都做到极致的安全，比如并没有限制容器的网络，也没有限制volume的权限等等，后续在安全的地方其实还有很多可以升级的地方，比如创建一个独立macOS 用户、禁止 allowInsecureAuth、不映射主目录、禁止 root 运行、禁止特权模式、网络出站限制、API 权限结构等等，最终的markdown应该是这样的，供大家参考。

Mac

├─ 主账号（日常使用）

│ ├─ 钱包插件

│ └─ 重要文件

│

└─ claw-runner 用户

└─ OrbStack

└─ OpenClaw

├─ 低权限 API

├─ 无私钥

└─ 网络白名单

龙虾和大脑都安装好后，就可以给它安装手脚和武器了，后续的进阶调教（比如接入 Telegram 指令、添加浏览器功能，授权终端技能等），包括加载其他大模型、agent和skill，大家就可以根据自己的喜好去自由发挥了。

我花了一周时间踩坑写下这篇教程，就是希望大家在面对新技术时，能多一分理性，少交一点学费。工具的上限永远取决于主人的认知，别让所谓的‘AI焦虑’打乱了原本的步伐。 自动化的真正意义，不是让你陷入焦虑的博弈，而是把你从机械的重复中解放出来，去思考更长期的周期与更底层的逻辑。

龙虾只是执行器，它代替不了我们对市场的敬畏和判断。今天这篇教程只是抛砖引玉，希望 A8 的小伙伴们能在这个框架之上，为自己的龙虾老婆学习更多的能力，把枯燥的执行工作交给她，把清醒的决策留给自己。守住本心，新的一年里，慢慢变富！