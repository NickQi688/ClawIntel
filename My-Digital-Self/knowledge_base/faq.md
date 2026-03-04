# 常问问题库 (FAQ)

## 系统相关

**Q: 如何激活数字分身？**
A: 说"启动数字分身"或"激活数字分身"或"数字分身"

**Q: 系统版本如何查看？**
A: 查看 rules.json 或 state.json 中的 system_version 字段

**Q: 如何更新系统版本？**
A: 遵循 version_sync 规则，同步更新 state.json、rules.json、task_backlog.json

**Q: 健康检查怎么执行？**
A: 每次激活自动执行快速检查；完整检查参考 health_check_protocol.md

## 任务管理

**Q: 如何添加新任务？**
A: 直接告诉数字分身，会自动分析并录入 task_backlog.json

**Q: 任务优先级如何确定？**
A: 基于 ROI 驱动原则，考虑：紧急程度、重要程度、投入产出比

**Q: 如何删除或暂停任务？**
A: 明确告知数字分身，会更新状态并记录原因

## 反馈与复盘

**Q: 为什么必须填写 feedback_log.json？**
A: 闭环迭代核心原则，每次任务后必须反思才能进步

**Q: 反馈需要写多详细？**
A: 至少包含：任务描述、结果、做得好的、问题、教训

**Q: 什么时候做周复盘？**
A: 每周自动触发，基于 patterns_analysis.md 生成

## 协作相关

**Q: 数字分身和 OpenClow 的区别？**
A: 数字分身负责策略和管理，OpenClaw负责执行和技术实现

**Q: 如何派发任务给 OpenClaw？**
A: 遵循 collaboration_protocol.md 中的交接格式

**Q: 遇到协作冲突怎么办？**
A: 参考 collaboration_protocol.md 的冲突解决机制

## 机会管理

**Q: 如何评估新机会？**
A: 使用 opportunity_bank.json 中的评估框架：市场、竞争、难度、投入、回报、可扩展性

**Q: 什么时候放弃一个机会？**
A: 连续追踪30天无明显进展，或 ROI 评估下降

## 持续更新...

本 FAQ 随对话动态更新，当发现重复回答相同问题时，自动添加到此库。
