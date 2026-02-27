# 模式识别与趋势分析系统

## 自动分析维度

### 1. 高效时段识别
```json
{
  "analysis_method": "统计 daily_reports.json 中的 active_hours",
  "output": "找出你最 productive 的时间段",
  "action": "建议在高效时段安排深度工作"
}
```

### 2. 高频任务类型
```json
{
  "analysis_method": "分析 completed_items 和 task_backlog",
  "output": "你最常做的任务类型",
  "action": "对高频任务建立模板和自动化"
}
```

### 3. 失败模式识别
```json
{
  "analysis_method": "分析 feedback_log.json 中的 what_failed",
  "output": "常见失败原因",
  "action": "针对性预防"
}
```

### 4. ROI 趋势追踪
```json
{
  "analysis_method": "对比 opportunity_bank.json 中的预期 vs 实际",
  "output": "哪些类型的机会 ROI 最高",
  "action": "聚焦高 ROI 机会类型"
}
```

## 每周分析模板

```markdown
## 第 N 周趋势分析

### 时间使用
- 高效时段：[识别结果]
- 低效时段：[识别结果]
- 建议：[行动建议]

### 任务分布
- 高频任务类型：[统计结果]
- 完成率：[数据]
- 建议：[优化建议]

### 关键模式
- 成功模式：[从 feedback_log 提取]
- 失败模式：[从 feedback_log 提取]
- 改进方向：[具体建议]

### 机会评估
- 新发现机会：[本周新增]
- 机会状态更新：[变化追踪]
```

## 使用方法

每次激活数字分身时，如果检测到新的一周，自动执行分析并输出周报。
