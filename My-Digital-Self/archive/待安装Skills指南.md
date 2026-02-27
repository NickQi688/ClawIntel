# 待安装Skills - 手动安装指南

## 当前状态

由于GitHub网络连接问题，以下两个skills需要手动安装。

---

## 1. Superpowers (强烈推荐)

### 功能
- `/brainstorm` - 快速头脑风暴
- `/write-plan` - 任务拆分和规划
- `/execute-plan` - 自动执行计划

### 应用场景
- AI视频项目：快速生成200条视频的创意和执行计划
- 虚拟资料店：产品设计和推广计划
- 自媒体：选题策划

### 安装方法

#### 方法1：到公司网络后自动安装（最简单）
```
/install superpowers@superpowers-marketplace
```

#### 方法2：手动克隆市场仓库
```bash
cd ~/.claude/plugins/marketplaces
git clone https://github.com/obra-ai/superpowers-marketplace.git
```
然后在Claude Code中：
```
/install superpowers@superpowers-marketplace
```

#### 方法3：使用skills.sh
访问 https://skills.sh 搜索 "superpowers"

---

## 2. Document Suite (官方)

### 功能
- Office全家桶（Word/Excel/PPT/PDF）
- 带格式、带公式生成

### 应用场景
- 虚拟资料店的资料整理
- 自动生成文档
- 格式化输出

### 安装方法

#### 方法1：到公司网络后自动安装（最简单）
```
/install document-skills@anthropic-agent-skills
```

#### 方法2：手动克隆市场仓库
```bash
cd ~/.claude/plugins/marketplaces
git clone https://github.com/anthropics/anthropic-agent-skills.git
```
然后在Claude Code中：
```
/install document-skills@anthropic-agent-skills
```

#### 方法3：使用skills.sh
访问 https://skills.sh 搜索 "document"

---

## 下次对话时的快速命令

直接说以下任一句：

```
"安装 Superpowers"
"安装 Document Suite"
"检查 skills 更新"
```

我会自动完成安装。

---

## 清单位置

已添加到：`学习/编程相关/skill/Skills 收藏清单.md`

---

*创建日期: 2026-01-23*
