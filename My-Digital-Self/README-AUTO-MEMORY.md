# 数字分身自动记忆系统

> 检测关键词，自动更新记忆文件 - 让你的数字分身拥有持久记忆

## 🎯 功能

当你说话时，数字分身会自动检测触发词并更新记忆：

| 你说 | 自动行为 |
|------|----------|
| "搞定了自动化" | 记录到state.json |
| "决定做这个项目" | 记录到decisions.json |
| "发现一个机会" | 记录到opportunities.json |
| "踩坑了" | 记录到lessons.json |

## 📁 记忆文件

```
My-Digital-Self/
├── state.json              # 当前状态、今日完成
├── decisions.json          # 决策历史
├── opportunities.json      # 机会银行
├── lessons.json            # 教训库
├── conversation_log.md     # 对话记录
├── memory-triggers.json    # 触发器配置
└── memory-manager.js       # 记忆管理器
```

## 🚀 使用方式

### 在Skill中使用

数字分身skill已集成自动记忆功能：

```markdown
用户：搞定了币圈资讯自动化

数字分身：✅ 自动检测到 "搞定"
        ✅ 已更新 state.json
        ✅ 今日完成: 币圈资讯自动化
```

### 作为独立模块使用

```javascript
import { processMemoryUpdate } from './memory-manager.js';

// 处理文本并自动更新记忆
const result = processMemoryUpdate("搞定了自动化资讯抓取", {
  task_completed: "自动化资讯抓取",
  time_spent: "30分钟",
  outcome: "成功"
});

console.log(result);
// { triggered: true, state: {...}, message: "✅ 已更新状态..." }
```

## ⚙️ 自定义触发器

编辑 `memory-triggers.json` 添加自己的触发词：

```json
{
  "triggers": {
    "my_trigger": {
      "keywords": ["我的关键词", "另一个词"],
      "action": "update_state_and_log",
      "priority": "高",
      "fields": {
        "custom_field": "提取什么信息"
      }
    }
  }
}
```

## 📊 数据结构

### state.json - 当前状态
```json
{
  "today": {
    "completed": ["任务1", "任务2"],
    "in_progress": [],
    "blocked": []
  },
  "priorities": {
    "P1_今天": ["重要任务"]
  }
}
```

### decisions.json - 决策记录
```json
{
  "decisions": {
    "2026-02-27-001": {
      "topic": "是否做这个项目",
      "decision": "做",
      "reason": "ROI高"
    }
  }
}
```

### opportunities.json - 机会银行
```json
{
  "opportunities": {
    "2026-02-27-001": {
      "title": "6551 API应用",
      "roi_score": 8,
      "status": "进行中"
    }
  }
}
```

### lessons.json - 教训库
```json
{
  "lessons": {
    "2026-02-27-001": {
      "problem": "路径问题",
      "root_cause": "相对路径混乱",
      "solution": "使用绝对路径"
    }
  }
}
```

## 🔍 触发词列表

### 完成类
- 完成、搞定、做完了、结束了、好了、OK了、✅、成功
- finished、done

### 决策类
- 决定、决策、选、定了、确定、决定做、不做了

### 机会类
- 发现、机会、可以试试、有意思的、新想法、灵感、商业模式、变现

### 教训类
- 踩坑、失败、错误、问题、bug、不work、搞不定、错了

### 想法类
- 想法、点子、灵感、可以这样、要不、试试

## 💡 最佳实践

1. **说人话** - 用自然语言，数字分身会自动理解
2. **明确表达** - "完成xxx" 比 "好了" 更好
3. **及时记录** - 说过的话自动记录，不用再手动写
4. **定期回顾** - 查看 conversation_log.md 了解历史

## 📝 示例对话

### 场景1：完成任务
```
你：自动化资讯抓取搞定了

分身：✅ 自动检测到 "搞定"
     ✅ 已更新 state.json
     ✅ 今日完成: 自动化资讯抓取
     ✅ 已写入 conversation_log.md
```

### 场景2：做决策
```
你：决定不做Seedance商业化，先专注6551

分身：✅ 自动检测到 "决定"
     ✅ 已记录决策: 不做Seedance商业化
     ✅ 已写入 decisions.json
     理由: 优先专注6551项目
```

### 场景3：踩坑
```
你：又踩坑了，API token格式错了

分身：✅ 自动检测到 "踩坑"
     ✅ 已记录教训: API token格式错误
     ✅ 已写入 lessons.json
     建议: 复制前检查格式
```

## 🛠️ 故障排除

### 触发器不工作
1. 检查 `memory-triggers.json` 是否存在
2. 检查关键词是否在配置中
3. 检查是否有写入权限

### 文件没更新
1. 检查路径是否正确
2. 检查JSON格式是否有效
3. 查看conversation_log.md错误日志

---

**版本**: 1.0.0
**集成**: digital-self skill v2.0
**最后更新**: 2026-02-27
