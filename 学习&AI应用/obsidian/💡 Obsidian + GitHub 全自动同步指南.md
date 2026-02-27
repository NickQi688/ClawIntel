
本指南旨在帮助你在多台设备间实现笔记的“无感同步”。

## 第一阶段：第一台电脑（源数据端）

**目标**：将本地笔记上传至 GitHub 仓库。

### 1. 准备仓库

- 在 GitHub 上创建一个新的私有仓库（Private Repository）。
    
- **不要**勾选 "Initialize this repository with a README"。
    

### 2. 本地初始化与推送

在你的 Obsidian 库根目录下打开终端：

Bash

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
# 替换为你的仓库 SSH 地址
git remote add origin git@github.com:用户名/仓库名.git
git push -u origin main
```

### 3. 配置 Obsidian 自动同步

1. 在 Obsidian 中安装社区插件：**Obsidian Git**。
    
2. **设置自动备份（上传）**：
    
    - `Vault backup interval (minutes)`：建议设为 `5`。
        
3. **设置自动拉取（下载）**：
    
    - `Auto pull interval (minutes)`：建议设为 `5`。
        
4. **设置推送冲突解决策略**：
    
    - `On conflict`：建议选择 `Cancel backup and show warning`（手动解决更安全）。
        

---

## 第二阶段：第二台电脑（同步接收端）

**目标**：拉取云端笔记并建立自动化关联。

### 1. 配置 SSH 免密访问（关键）

为了避免频繁输入密码，推荐使用 SSH 密钥。

1. **生成密钥**：打开终端输入 `ssh-keygen -t ed25519 -C "your_email@example.com"`，一路回车。
    
2. **获取公钥**：输入 `cat ~/.ssh/id_ed25519.pub`，复制显示的整行内容。
    
3. **绑定 GitHub**：进入 GitHub `Settings` -> `SSH and GPG keys` -> `New SSH key`，将内容粘贴并保存。
    

### 2. 克隆仓库到本地

在终端中进入你存放文档的目录：

Bash

```
# 请使用 SSH 地址克隆，避免 Token 过期问题
git clone git@github.com:用户名/仓库名.git
```

### 3. 激活 Obsidian 同步

1. 用 Obsidian 打开克隆下来的文件夹。
    
2. 启用 **Obsidian Git** 插件。
    
3. **核心配置**：
    
    - 开启 `Pull updates on startup`（软件启动时自动下载最新内容）。
        
    - 设置 `Vault backup interval` 和 `Auto pull interval`。
        

---

## 第三阶段：日常维护与避坑

### 1. 忽略不必要的文件

为了防止两台电脑的 UI 设置（如窗口大小、缩放比例）互相打架，建议在仓库根目录创建 `.gitignore` 文件：

Plaintext

```
# 忽略工作区布局和缓存
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.obsidian/cache/
.DS_Store
```

### 2. 冲突解决“金律”

- **养成习惯**：在一台电脑写完后，稍等几秒确保右下角显示 `Git: Pushed`。
    
- **遇到冲突怎么办**：
    
    - Git 会在文件中插入 `<<<<<<< HEAD` 这种标记。
        
    - 手动删除多余的标记，保留正确的文字。
        
    - 在 Obsidian 命令面板（Cmd+P）搜索执行 `Obsidian Git: Commit all changes`，然后 `Push` 即可。
        

---

### 3. 常见命令对照表表

|**动作**|**插件命令 (Cmd+P)**|**手动 Git 命令**|
|---|---|---|
|**手动上传**|`Obsidian Git: Commit all changes` + `Push`|`git commit -am "..."` + `git push`|
|**手动拉取**|`Obsidian Git: Pull`|`git pull`|
|**查看状态**|观察右下角状态栏|`git status`|
