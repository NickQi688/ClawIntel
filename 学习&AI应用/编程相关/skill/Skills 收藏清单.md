# 已安装 Skills

### 自主开发

#### openai-prompt-packs
- 来源: OpenAI Academy
- 位置: ~/.claude/skills/openai-prompt-packs/
- 功能: OpenAI官方提示词库
- 特点:
  - 60+高质量提示词模板
  - 三大角色: 通用工作、工程开发、产品管理
  - 清晰分类，快速查找
  - 使用技巧和示例
- 应用场景:
  - 邮件写作、会议管理
  - 技术调研、代码调试
  - 竞品分析、PRD编写

#### ai-video-generator
- GitHub: https://github.com/NickQi688/ai-video-generator
- 功能: 商用级智能视频生成系统
- 特点:
  - 双工作模式: 智能规划 + 快速生成
  - 客户品牌融入: 参考图分析、元素提取
  - 持续学习: 记录反馈、自动优化
  - 完整交互: 9个阶段逐步确认
- 状态: 已上传GitHub，待API对接

#### digital-self-activation
- 位置: ~/.claude/skills/digital-self-activation/
- 功能: 数字分身快速激活
- 触发: 说"小鲸"或"数字分身"
- 特点:
  - 读取核心文件（背景、日志、任务、日报、规则）
  - 生成状态汇报（昨天完成、今天待办、优先级、阻塞）
  - 等待下一步指令

#### video-gen
- 位置: ~/.claude/skills/video-gen/
- 功能: 商用级AI视频生成器 v2.0
- 特点:
  - 8种文字特效（打字机、发光、滑动等）
  - 文字样式（颜色、加粗）
  - 显示模式（全部、逐行）
  - 性能优化（打字机提速）
  - TTS语音合成

#### https://github.com/yizhiyanhua-ai/skills-updater.git
skill检查更新

### 待安装

#### Superpowers (强烈推荐)
- 来源: superpowers-marketplace
- 安装: `/install superpowers@superpowers-marketplace`
- 功能: /brainstorm + /write-plan + /execute-plan
- 价值:
  - 快速头脑风暴，给AI视频项目出创意
  - 任务拆分成可执行步骤
  - 自动执行计划
  - 对"快速执行力"需求完美契合
- 应用场景:
  - AI视频项目：快速生成200条视频的创意和执行计划
  - 虚拟资料店：产品设计和推广计划
  - 自媒体：选题策划
- 状态: 待网络恢复后安装

#### Document Suite
- 来源: anthropic-agent-skills (官方)
- 安装: `/install document-skills@anthropic-agent-skills`
- 功能: Office全家桶（Word/Excel/PPT/PDF）
- 特点: 带格式、带公式生成
- 应用场景:
  - 虚拟资料店的资料整理
  - 自动生成文档
  - 格式化输出
- 状态: 待网络恢复后安装

### 开源封装

#### video-downloader
- 基于项目: yt-dlp (https://github.com/yt-dlp/yt-dlp)
- Stars: 143k
- 功能: 通用视频下载工具
- 支持站点: 1000+（YouTube、Bilibili等）
- 特点:
  - 批量下载
  - 质量选择
  - 字幕支持
  - 格式转换
- 测试: B站下载成功（13MB，720p）

#### Humanizer-zh
- GitHub: https://github.com/op7418/Humanizer-zh
- 功能: AI写作去痕工具
- 特点:
  - 检测24种AI写作模式
  - 四大分类: 内容、语言、风格、交流
  - 典型检测: 夸大象征、AI词汇、三段式法则、否定式排比
  - 核心原则: 去除痕迹+注入真实个性

#### youtube-clipper
- GitHub: https://github.com/op7418/Youtube-clipper-skill
- 功能: AI驱动YouTube视频剪辑工具
- 特点:
  - AI语义分析：自动生成2-5分钟的章节
  - 精确剪辑：FFmpeg帧准确计时
  - 双语字幕：批量翻译中英双语（95% API调用减少）
  - 字幕烧录：可自定义样式的硬字幕
  - 内容摘要：自动生成社交媒体文案
- 应用场景:
  - 提取视频精彩片段
  - 制作短视频内容
  - 双语字幕生成
  - 社交媒体内容创作

---

## 推荐收藏（来自宝玉）

来源: https://github.com/JimLiu/baoyu-skills

### 自动化类

#### Rube MCP Connector
- 功能: 一个服务器连接500+应用
- 支持: Slack、GitHub、Notion等
- 价值: 省去单独授权，自动化神器

#### MCP Builder
- 功能: 自动生成MCP服务器模版
- 价值: 省掉80%环境搭建时间

### 工作流类

#### Superpowers
- 作者: obra大神
- 功能: /brainstorm + /write-plan + /execute-plan
- 价值: 从聊天机器人变成开发工作流

#### Systematic Debugging
- 功能: 根因分析 → 假设 → 修复 → 文档
- 价值: 拒绝无头苍蝇式调试

### 内容创作类

#### Document Suite
- 来源: 官方出品
- 功能: Office全家桶（Word/Excel/PPT/PDF）
- 特点: 带格式、带公式生成

#### Algorithmic Art
- 功能: 自然语言写p5.js生成艺术
- 示例: 蓝紫渐变流场，5000粒子，随机种子42

#### Theme Factory
- 功能: 上传品牌规范，自动对齐配色字体
- 对象: Artifacts素材生成

#### Brand Guidelines
- 功能: 多品牌管理，一键切换
- 场景: 多项目并行

### 测试类

#### Webapp Testing
- 工具: Playwright自动化
- 功能: 自动写脚本+跑测试
- 示例: "测一下登录流程"

#### Slack GIF Creator
- 功能: 生成Slack专用动图
- 场景: 团队沟通

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

*更新日期: 2026-01-23*
