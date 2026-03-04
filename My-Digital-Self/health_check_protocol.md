# 数字分身系统健康检查协议

本文档定义系统健康检查的标准流程。

## 快速检查（每次激活必做）

```bash
# 1. 检查版本一致性
grep "system_version" My-Digital-Self/rules.json
grep "version" My-Digital-Self/state.json

# 2. 如果不一致，修复 state.json
# 编辑 state.json，将 version 更新为与 rules.json 相同
```

## 完整检查（发现异常时执行）

### 检查项清单

| # | 检查项 | 验证方法 | 修复操作 |
|---|--------|----------|----------|
| 1 | state.json 版本 | 对比 rules.json | 更新 state.version |
| 2 | daily_reports.json 格式 | JSON 验证 | 修复结构错误 |
| 3 | task_backlog.json 重复键 | 检查 completed_today | 合并重复键 |
| 4 | feedback_log.json 内容 | 检查 feedback_entries | 填充反馈记录 |
| 5 | opportunity_bank.json 项目 | 检查 opportunities 数组 | 录入当前项目 |

### 执行流程

1. **发现问题** → 记录到 conversation_log.md
2. **分析原因** → 找出根本原因
3. **执行修复** → 修改对应文件
4. **验证结果** → 确认问题解决
5. **更新反馈** → 填写 feedback_log.json

## 预防措施

- **每次激活**：执行快速检查
- **每次任务完成**：填写 feedback_log.json
- **每次升级**：同步版本号到所有文件
- **每周**：执行一次完整检查

## 问题诊断模板

```
问题发现时间：[时间]
问题描述：[具体问题]
影响范围：[哪些功能受影响]
根本原因：[分析结果]
修复方案：[具体步骤]
修复时间：[时间]
验证结果：[✅/❌]
经验教训：[如何预防]
```

## 相关文件

- `rules.json` - 系统版本和维护规则
- `state.json` - 系统当前状态
- `conversation_log.md` - 问题诊断记录
- `feedback_log.json` - 反馈和学习记录
