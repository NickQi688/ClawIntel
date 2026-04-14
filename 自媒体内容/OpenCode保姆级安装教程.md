# OpenCode 保姆级安装教程：Mac + Windows 完整指南

> **不需要注册账号，不需要绑定信用卡，没有乱七八糟的各种限制。**
>
> 最关键的一条是：**免费**。
>
> 这是"0成本搭建数字分身系统"配套的 OpenCode 安装教程，新手友好，开箱即用。

---

## OpenCode 是什么？

一句话：**免费版 Claude Code**。

它是 Claude 的开源替代品，自带一大堆免费模型。不用注册账号，不用绑信用卡，下载就能用。

### 为什么选择 OpenCode？

- ✅ **完全免费** - 开源项目，所有功能都能用
- ✅ **自带免费模型** - GLM-4.7、Minimax 2.5 等完全免费
- ✅ **体验几乎一样** - 和 Claude Code 使用体验高度相似
- ✅ **支持 75+ 模型** - 可以接入 GPT、Gemini、Mistral 等
- ✅ **兼容 Claude Code** - 支持 Command、Agent、Skill、MCP、Hook

---

## 第一部分：Mac 用户安装指南

### 方法1：一键安装（推荐）

打开电脑的"终端"（或 Warp），复制下面这行命令，粘贴，回车：

```bash
curl -fsSL https://opencode.ai/install | bash
```

**等它安装完，输入 `opencode` 回车，就能看到界面了。**

**如果上面的命令不行，试试这个：**
```bash
brew install opencode
```

### 方法2：手动下载安装

1. 访问：https://github.com/opencode-project/opencode/releases
2. 下载最新版本（找 .dmg 或 .pkg 文件）
3. 双击安装包，按提示安装
4. 安装完成后，打开"终端"，输入 `opencode` 回车

### 常见问题

**Q：提示"command not found"怎么办？**
- 检查是否安装成功
- 尝试重启终端
- 检查 PATH 环境变量

**Q：安装很慢怎么办？**
- 可能是网络问题，多试几次
- 或者使用手动下载安装

---

## 第二部分：Windows 用户安装指南

### 步骤1：下载安装包

1. 打开这个网址：https://github.com/opencode-project/opencode/releases
2. 找到最新版本（通常在最上面）
3. 下载 .exe 文件（比如 `opencode-windows-x64.exe`）

### 步骤2：安装

1. 双击下载的 .exe 文件
2. 可能会弹出安全警告，点击"更多信息"→"仍要运行"
3. 按安装向导一步步完成安装

### 步骤3：启动

安装完成后，有几种方式启动：

**方式1：使用命令提示符**
1. 按 `Win + R`，输入 `cmd`，回车
2. 输入 `opencode`，回车

**方式2：使用 PowerShell**
1. 按 `Win + X`，选择"Windows PowerShell"
2. 输入 `opencode`，回车

### 常见问题

**Q：提示"Windows 保护你的电脑"怎么办？**
- 点击"更多信息"
- 点击"仍要运行"

**Q：安装失败怎么办？**
- 检查是否是权限问题，右键"以管理员身份运行"
- 关闭杀毒软件后重试
- 下载完整版重新安装

---

## 第三部分：第一次启动配置

### 1. 选择免费模型

安装好后，你会看到类似这样的界面：

如果你用过 Claude Code，应该很眼熟。

如果没用过也别慌，跟 AI 说一句：

> `/model`

你就能看到一大堆模型列表。**找带 "free" 的，那些就是免费的。**

### 2. 推荐配置：GLM-4.7

**推荐用 GLM-4.7：**
- ✅ 完全免费
- ✅ 中文友好
- ✅ 代码生成能力强（官方测试成绩第一梯队）
- ✅ 指令遵循能力好（写 Skill、调用工具都很靠谱）

**一句话就能切换模型：**
> `请使用 GLM-4.7 模型`

就这么简单。

### 3. （可选）接入 GPT 或 Gemini

如果你订阅了 ChatGPT 或 Google Gemini，可以让 OpenCode 接入。

跟 OpenCode 说：
> `/connect`

选择 OpenAI 或 Google，打开浏览器登录授权，就能用了。

**但说实话，免费的 GLM-4.7 已经够用了。**

新手上路，先用免费的，熟悉了再说。

---

## 第四部分：核心使用技巧

### 基础命令

```bash
# 启动 OpenCode
opencode

# 查看可用模型
/model

# 连接付费模型（可选）
/connect

# 退出
按 Ctrl + C
```

### 推荐免费模型组合

**组合1：全免费方案**
- GLM-4.7（主力模型）
- Minimax 2.5（备用模型）
- big pickly（备用模型）

**组合2：有 Gemini 额度**
- GLM-4.7（主力模型）
- Google Gemini（通过 /connect 接入）

---

## 第五部分：常见问题 FAQ

### Q1：安装失败怎么办？

**A：分步骤排查：**

1. **检查网络连接**
   - 能否访问 GitHub
   - 是否被墙

2. **尝试替代方案**
   - Mac：用 Homebrew 安装
   - Windows：手动下载安装包

3. **检查权限**
   - Mac：是否有 sudo 权限
   - Windows：是否以管理员身份运行

### Q2：模型使用有限制吗？

**A：完全免费的模型没有限制：**
- GLM-4.7：完全免费
- Minimax 2.5：完全免费

**接入的付费模型：**
- 按各自的 API 收费标准
- 注意使用量

### Q3：和 Claude Code 的区别？

**A：体验几乎一样：**

**相同点：**
- 界面布局
- 命令操作
- 支持 Skill、Agent、MCP

**不同点：**
- OpenCode：开源，免费模型多
- Claude Code：官方，更稳定（需付费）

### Q4：卸载怎么办？

**Mac 用户：**
```bash
brew uninstall opencode
```

**Windows 用户：**
1. 控制面板 → 程序和功能
2. 找到 OpenCode，卸载

---

## 写在最后

**OpenCode + 免费模型 = 0 成本 AI 编程。**

别被"AI 编程"这四个字吓到了。有了 OpenCode：
- 不需要买昂贵的订阅
- 不需要绑信用卡
- 不需要学复杂的配置

**下载安装，30 分钟就能上手。**

今晚花半小时，明天你就拥有了免费的 AI 编程助手。

---

## 附录：资源链接

- **官网**：https://opencode.ai/
- **GitHub**：https://github.com/opencode-project/opencode
- **文档**：https://opencode.ai/docs

---

*Created: 2026-03-03*
*Updated: 2026-03-03*

🏷️ #OpenCode #AI工具 #免费 #保姆教程 #Claude替代
