# 已安装 Skills 完整清单

> 更新日期: 2026-02-12
> 用途: 快速在其他电脑上安装需要的 skills

---

## 已安装 Skills

### 自主开发

#### 1. digital-self-activation
- **位置**: `~/.claude/skills/digital-self-activation/`
- **功能**: 数字分身快速激活系统
- **触发词**: "激活数字分身", "digital-self", "boot-ds"
- **特点**:
  - 四阶段启动流程（上下文加载 → TELOS理解 → 状态报告 → 工作模式）
  - 读取核心文件（personal_background, conversation_log, task_backlog, daily_reports, rules）
  - 生成结构化日报（昨天完成、今天待办、关键洞察、明天建议）
- **适用场景**: 每日启动、切换电脑时快速同步状态

#### 2. video-gen
- **位置**: `~/.claude/skills/video-gen/`
- **功能**: 商用级AI视频生成器 v2.0
- **特点**:
  - 8种文字特效（打字机、发光、滑动、弹跳等）
  - 文字样式（颜色、加粗、字体）
  - 显示模式（全部显示、逐行显示）
  - 性能优化（打字机算法提速）
  - TTS语音合成
- **适用场景**: 短视频制作、产品展示、广告素材

#### 3. ai-video-generator
- **GitHub**: https://github.com/NickQi688/ai-video-generator
- **功能**: 商业级智能视频生成系统
- **特点**:
  - 双工作模式: Smart Planning（智能规划）+ Quick Generate（快速生成）
  - 客户品牌融入: 参考图分析、元素提取
  - 持续学习: 记录用户反馈、自动优化
  - 完整交互: 9个阶段逐步确认
- **状态**: 已上传GitHub，待API对接
- **安装**:
  ```bash
  git clone https://github.com/NickQi688/ai-video-generator.git ~/.claude/skills/ai-video-generator
  ```

#### 4. gemini-seedance-prompt-generator
- **位置**: `~/.claude/skills/gemini-seedance-prompt-generator/`
- **GitHub**: https://github.com/NickQi688/gemini-seedance-prompt-generator
- **功能**: 为即梦 Seedance 2.0 生成精准提示词
- **模型**: Gemini 3.5 Flash Preview（100 万 tokens，低成本 $0.075/百万tokens，视觉理解强）
- **特点**:
  - 10 大场景支持（文本生成、一致性控制、运镜复刻等）
  - 6 大餐饮场景（小人国萌娃、烤肉广告、烧烤江湖、食材拆解、节日系列、小猫跳舞）
  - 3 个版本提示词（基础版/专业版/创意版）
  - 中英混合输出（中文描述 + 英文专业术语）
  - 首帧图片提示词优化（集成 Nano Banana Pro，6000+ 图像提示词库）
  - 对话优化调整流程（多轮迭代）
  - 灵活工作流（4种路径）
- **适用场景**: 为 Seedance 2.0 快速生成专业级提示词
- **状态**: ✅ 已完成，已安装
- **安装**:
  ```bash
  npx skills i gemini-seedance-prompt-generator
  # 或手动克隆
  git clone https://github.com/NickQi688/gemini-seedance-prompt-generator.git ~/.claude/skills/gemini-seedance-prompt-generator
  ```

### 待安装（强烈推荐）

#### 1. Superpowers ⭐
- **来源**: superpowers-marketplace
- **GitHub**: https://github.com/anthropics/superpowers
- **安装命令**:
  ```bash
  npx @superpowers-marketplace/install@latest
  # 或
  /install superpowers@superpowers-marketplace
  ```
- **功能**: `/brainstorm + /write-plan + /execute-plan` 三件套
- **价值**:
  - 快速头脑风暴，给AI视频项目出创意
  - 自动任务拆分成可执行步骤
  - 一键执行计划
  - 对"快速执行力"需求完美契合
- **应用场景**:
  - AI视频项目：快速生成200条视频的创意和执行计划
  - 虚拟资料店：产品设计和推广计划
  - 自媒体：选题策划、内容生产SOP

#### 2. Document Suite
- **来源**: anthropic-agent-skills (官方)
- **GitHub**: https://github.com/anthropics/anthropic-agent-skills
- **安装命令**:
  ```bash
  /install document-skills@anthropic-agent-skills
  ```
- **功能**: Office全家桶（Word/Excel/PPT/PDF）
- **特点**:
  - 格式化输出（带表格、带公式）
  - 模板化生成
  - 多语言支持
- **应用场景**:
  - 虚拟资料店的资料整理
  - 自动生成文档
  - 商业报告生成

#### 3. skills-updater
- **GitHub**: https://github.com/yizhiyanhua-ai/skills-updater.git
- **功能**: skills 检查和自动更新工具
- **安装命令**:
  ```bash
  git clone https://github.com/yizhiyanhua-ai/skills-updater.git ~/.claude/skills/skills-updater
  ```

### 开源封装（已收藏）

#### 1. video-downloader
- **基于项目**: yt-dlp (https://github.com/yt-dlp/yt-dlp)
- **Stars**: 143k+
- **功能**: 通用视频下载工具
- **支持站点**: 1000+（YouTube、Bilibili、Twitter等）
- **特点**:
  - 批量下载
  - 质量选择（1080p, 4K等）
  - 字幕支持（自动下载字幕文件）
  - 格式转换（MP4, MKV, WEBM）
- **测试**: B站下载成功（13MB，720p）
- **安装**:
  ```bash
  brew install yt-dlp  # macOS
  pip install yt-dlp   # 通用
  ```

#### 2. Humanizer-zh
- **GitHub**: https://github.com/op7418/Humanizer-zh
- **功能**: AI写作去痕工具（中文版）
- **特点**:
  - 检测24种AI写作模式
  - 四大分类: 内容、语言、风格、交流
  - 典型检测: 夸大象征、AI词汇、三段式法则、否定式排比
  - 核心原则: 去除痕迹+注入真实个性
- **适用场景**: 编辑或审阅文本，使其听起来更自然、更像人类书写

#### 3. youtube-clipper
- **GitHub**: https://github.com/op7418/youtube-clipper-skill
- **功能**: AI驱动YouTube视频智能剪辑工具
- **特点**:
  - AI语义分析：自动生成2-5分钟的精细章节
  - 精确剪辑：FFmpeg帧准确计时
  - 双语字幕：批量翻译中英双语（95% API调用减少）
  - 字幕烧录：可自定义样式的硬字幕
  - 内容摘要：自动生成社交媒体文案
- **应用场景**:
  - 提取视频精彩片段
  - 制作短视频内容
  - 双语字幕生成
  - 社交媒体内容创作

#### 4. nano-banana-pro-prompts-recommend-skill
- **GitHub**: https://github.com/UMind-OpenLab/nano-banana-pro-prompts-recommend-skill
- **功能**: 6000+ 精选图像生成提示词推荐
- **安装命令**:
  ```bash
  npx skills i UMind-OpenLab/nano-banana-pro-prompts-recommend-skill
  ```
- **特点**:
  - 6000+ 提示词库（头像、社媒、产品、信息图、海报、电商、游戏、缩略图、漫画）
  - 每个提示词包含：英文提示词、中文描述、示例图片
  - 智能分类匹配：根据关键词自动推荐对应类别提示词
  - 内容插图模式：支持用户提供文章/脚本，自动 remix 生成定制提示词
  - 多语言支持：响应用户输入语言，英文提示词用于生成
  - Token 优化：使用 Grep 搜索，不加载完整文件
- **应用场景**:
  - Seedance 2.0 首帧提示词优化（封面、缩略图、产品照）
  - 图像生成灵感寻找
  - 文章/播客插图生成
  - 社交媒体内容创作
  - 提示词技巧学习

---

## 推荐收藏（来自宝玉）

来源: https://github.com/JimLiu/baoyu-skills

### 自动化类

#### Rube MCP Connector
- **功能**: 一个服务器连接500+应用
- **支持**: Slack、GitHub、Notion等
- **价值**: 省去单独授权，自动化神器

#### MCP Builder
- **功能**: 自动生成MCP服务器模版
- **价值**: 省掉80%环境搭建时间

### 工作流类

#### Systematic Debugging
- **功能**: 根因分析 → 假设 → 修复 → 文档
- **价值**: 拒绝无头苍蝇式调试

### 内容创作类

#### Algorithmic Art
- **功能**: 自然语言写p5.js生成艺术
- **示例**: 蓝紫渐变流场，5000粒子，随机种子42

#### Theme Factory
- **功能**: 上传品牌规范，自动对齐配色字体
- **对象**: Artifacts素材生成

#### Brand Guidelines
- **功能**: 多品牌管理，一键切换
- **场景**: 多项目并行

### 测试类

#### Webapp Testing
- **工具**: Playwright自动化
- **功能**: 自动写脚本+跑测试
- **示例**: "测一下登录流程"

#### Slack GIF Creator
- **功能**: 生成Slack专用动图
- **场景**: 团队沟通

---

## 技能开发方法论

### GitHub开源项目Skill化工作流

1. AI搜索GitHub找到成熟项目
2. 用skill-creator打包成Skill
3. 首次运行测试，找bug
4. 更新Skill固化经验
5. 形成可靠能力

### 核心原则

- 开源是宝藏，不要重复造轮子
- 经历时间考验的开源 > AI临时写代码
- 封装即能力，Skill化即复利
- 商用级标准，不是玩具

---

## 快速安装命令

```bash
# 核心三件套（强烈推荐）
/install superpowers@superpowers-marketplace
/install document-skills@anthropic-agent-skills

# 视频创作相关
git clone https://github.com/NickQi688/ai-video-generator.git ~/.claude/skills/ai-video-generator

# YouTube 工具
brew install yt-dlp
npx @op7418/youtube-clipper

# 文本优化
npx @op7418/humanizer-zh

# 图像提示词推荐（首帧优化）
npx skills i UMind-OpenLab/nano-banana-pro-prompts-recommend-skill
```

---

*最后更新: 2026-02-12*
*维护者: 小鲸 & Claudian*
