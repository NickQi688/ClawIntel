# GitHub开源弹药库

> 核心理念：不重复造轮子，站在全人类开源的肩膀上成长
> 工作流：AI搜索 → Skill封装 → 测试迭代 → 固化能力

## Skill化工作流程

1. **需求识别**：明确要解决的问题
2. **AI搜索**：用GPT搜索GitHub上的成熟开源项目
3. **Skill封装**：用skill-creator打包成Skill
4. **首次测试**：运行找bug，记录问题
5. **迭代优化**：更新Skill文件，固化经验
6. **能力入库**：加入个人弹药库

## 已封装Skills

### video-downloader ✅
- **来源**：yt-dlp (143k stars)
- **功能**：通用视频下载器（YouTube、B站等1000+网站）
- **状态**：✅ 已封装（2026-01-21）
- **封装位置**：`~/.claude/skills/video-downloader/`
- **测试结果**：安装成功，工具正常工作
- **使用场景**：
  - AI视频项目素材收集
  - 自媒体内容存档
  - 音频提取（MP3等）

### digital-self-activation
- **来源**：自研
- **功能**：数字分身快速激活
- **状态**：✅ 生产就绪

### video-gen v2.0
- **来源**：自研商用级
- **功能**：AI视频生成（8种特效、颜色、加粗、逐行显示）
- **状态**：✅ 商用级

### Humanizer-zh
- **来源**：GitHub - op7418/Humanizer-zh
- **功能**：AI写作去痕（24种痕迹检测）
- **状态**：✅ 已安装

## 待Skill化项目（按优先级）

### 🔴 高优先级（直接商业价值）

#### 1. Pake（网页转桌面APP）
- **GitHub**：https://github.com/tw93/Pake
- **Stars**：45k
- **功能**：把任何网页打包成轻量级桌面应用
- **商业价值**：
  - 快速制作工具原型
  - 给客户提供独立应用
- **状态**：待封装

#### 2. FFmpeg + ImageMagick（多媒体处理）
- **GitHub**：https://github.com/FFmpeg/FFmpeg + https://github.com/ImageMagick/ImageMagick
- **Stars**：FFmpeg 45k + ImageMagick 8k
- **功能**：
  - 视频/音频转换、剪辑、压缩
  - 图片批量处理、格式转换
- **商业价值**：
  - 视频项目后期处理
  - 素材批量处理
- **状态**：待封装

### 🟡 中优先级（提升效率）

#### 3. ArchiveBox（网页存档）
- **GitHub**：https://github.com/ArchiveBox/ArchiveBox
- **Stars**：21k
- **功能**：自建网页存档系统，支持多种格式
- **使用场景**：
  - 保存有价值的文章
  - 收集研究资料
- **状态**：待封装

#### 4. Ciphey（密码破译）
- **GitHub**：https://github.com/Ciphey/Ciphey
- **Stars**：14k
- **功能**：自动解密/解码工具
- **使用场景**：
  - 忘记密码恢复
  - CTF和安全研究
- **状态**：待封装

### 🟢 低优先级（备用）

#### 5. 格式转换工厂
- **组合**：Pandoc（文档）+ Calibre（电子书）+ 其他
- **功能**：万能格式转换
- **使用场景**：偶尔需要

#### 6. 数据抓取工具
- **候选**：Scrapy + BeautifulSoup
- **功能**：网页数据抓取
- **使用场景**：副业资源库自动采集

## Skill化实战经验（yt-dlp案例）

### 封装流程
1. **初始化**：`python3 skill-creator/scripts/init_skill.py video-downloader`
2. **编写SKILL.md**：
   - Frontmatter：name + description（避免特殊字符）
   - Quick Start：安装和基本使用
   - Common Options：常用参数
   - Troubleshooting：常见问题
3. **创建安装脚本**：`scripts/install.sh` 自动安装yt-dlp
4. **打包**：`python3 skill-creator/scripts/package_skill.py`
5. **测试**：安装成功，工具可调用

### 成功点
- ✅ skill-creator 工作流完善（init → edit → package）
- ✅ pip安装yt-dlp成功（2025.12.08版）
- ✅ 命令行工具可以正常调用

### 遇到的问题
- YouTube连接超时（网络问题，非工具问题）
- 需要cookies才能访问部分网站

### 解决方案
- YouTube用户需要安装浏览器扩展"Get cookies.txt"
- 保存cookies到 `~/.config/yt-dlp-cookies.txt`
- 使用 `--cookies` 参数指定文件

### YAML格式注意事项
- description中不能使用括号+冒号组合 `（1）`（YAML解析错误）
- 改用纯文本描述，避免特殊字符

### 优化建议
- 可以在Skill中添加代理设置支持
- 可以添加常见网站的cookies配置教程
- 可以创建批量下载脚本

### 首次运行经验总结
1. **依赖安装**：提供自动化安装脚本
2. **配置记录**：把首次遇到的问题记录到Skill中
3. **错误处理**：添加troubleshooting章节
4. **YAML格式**：注意frontmatter中的特殊字符

## 最佳实践

- 用GPT搜索找项目（幻觉少）
- 用Claude 4.5 Opus构建Skill
- 首次运行用GPT 5.2 Codex（如有）
- 后续运行无所谓模型选择
- 优先选择stars > 5k的项目
- 优先选择有包管理器支持的（pip/npm等）

---

*更新频率：每次封装新项目后更新*
