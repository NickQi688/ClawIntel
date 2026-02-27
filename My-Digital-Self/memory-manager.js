/**
 * 数字分身记忆管理器
 * 自动检测触发词并更新记忆文件
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const VAULT_ROOT = process.env.VAULT_ROOT || '/Users/zhaobo/Documents/qukuaiqiji/my-note';
const MEMORY_DIR = join(VAULT_ROOT, 'My-Digital-Self');

// 加载触发器配置
function loadTriggers() {
  const configPath = join(MEMORY_DIR, 'memory-triggers.json');
  if (!existsSync(configPath)) {
    return null;
  }
  return JSON.parse(readFileSync(configPath, 'utf-8'));
}

// 加载记忆文件
function loadMemory(filename) {
  const path = join(MEMORY_DIR, filename);
  if (!existsSync(path)) {
    return null;
  }
  return JSON.parse(readFileSync(path, 'utf-8'));
}

// 保存记忆文件
function saveMemory(filename, data) {
  const path = join(MEMORY_DIR, filename);
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// 检测触发词
function detectTrigger(text, triggers) {
  const detected = [];

  for (const [type, config] of Object.entries(triggers)) {
    for (const keyword of config.keywords) {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        detected.push({
          type,
          keyword,
          action: config.action,
          priority: config.priority,
          fields: config.fields
        });
        break;
      }
    }
  }

  return detected;
}

// 更新state.json
function updateState(task) {
  const state = loadMemory('state.json') || {};

  // 更新今日完成
  if (!state.today) state.today = {};
  if (!state.today.completed) state.today.completed = [];
  state.today.completed.push(task.task_completed);
  state.today.completed = [...new Set(state.today.completed)]; // 去重

  // 更新系统信息
  if (!state.system_info) state.system_info = {};
  state.system_info.total_interactions = (state.system_info.total_interactions || 0) + 1;
  state.system_info.last_updated = new Date().toISOString();

  // 清空进行中
  state.today.in_progress = [];

  saveMemory('state.json', state);
  return state;
}

// 记录决策
function recordDecision(decision) {
  const decisions = loadMemory('decisions.json') || {};
  if (!decisions.decisions) decisions.decisions = {};

  const id = `${new Date().toISOString().split('T')[0]}-${Object.keys(decisions.decisions).length + 1}`;

  decisions.decisions[id] = {
    topic: decision.topic,
    decision: decision.decision,
    reason: decision.reason,
    timestamp: new Date().toISOString(),
    owner: "小鲸"
  };

  decisions.last_updated = new Date().toISOString().split('T')[0];

  saveMemory('decisions.json', decisions);
  return decisions;
}

// 记录机会
function recordOpportunity(opportunity) {
  const opportunities = loadMemory('opportunities.json') || {};
  if (!opportunities.opportunities) opportunities.opportunities = {};

  const id = `${new Date().toISOString().split('T')[0]}-${Object.keys(opportunities.opportunities).length + 1}`;

  opportunities.opportunities[id] = {
    title: opportunity.what,
    potential: opportunity.potential || "待评估",
    market_size: opportunity.market,
    roi_score: opportunity.roi || 5,
    status: "新发现",
    timestamp: new Date().toISOString()
  };

  opportunities.last_updated = new Date().toISOString().split('T')[0];

  saveMemory('opportunities.json', opportunities);
  return opportunities;
}

// 记录教训
function recordLesson(lesson) {
  const lessons = loadMemory('lessons.json') || {};
  if (!lessons.lessons) lessons.lessons = {};

  const id = `${new Date().toISOString().split('T')[0]}-${Object.keys(lessons.lessons).length + 1}`;

  lessons.lessons[id] = {
    problem: lesson.problem,
    root_cause: lesson.root_cause,
    solution: lesson.solution,
    prevention: lesson.prevention,
    timestamp: new Date().toISOString()
  };

  lessons.last_updated = new Date().toISOString().split('T')[0];

  saveMemory('lessons.json', lessons);
  return lessons;
}

// 追加对话记录
function appendConversationLog(entry) {
  const logPath = join(MEMORY_DIR, 'conversation_log.md');
  const timestamp = new Date().toISOString();

  const entryText = `
## ${timestamp}

**类型**: ${entry.type}
**触发词**: ${entry.trigger}

### 内容
${entry.content}

### 自动提取
${JSON.stringify(entry.extracted, null, 2)}

---

`;

  if (existsSync(logPath)) {
    const existing = readFileSync(logPath, 'utf-8');
    writeFileSync(logPath, existing + entryText, 'utf-8');
  } else {
    writeFileSync(logPath, `# 对话记录\n\n${entryText}`, 'utf-8');
  }
}

// 主处理函数
export function processMemoryUpdate(text, extractedData = {}) {
  const triggers = loadTriggers();
  if (!triggers) {
    console.log('⚠️  触发器配置未找到');
    return null;
  }

  const detected = detectTrigger(text, triggers.triggers);

  if (detected.length === 0) {
    return { triggered: false };
  }

  const results = [];

  for (const trigger of detected) {
    let result = { type: trigger.type, triggered: true };

    switch (trigger.action) {
      case 'update_state_and_log':
        result.state = updateState(extractedData);
        result.message = `✅ 已更新状态: ${extractedData.task_completed}`;
        break;

      case 'record_decision':
        result.decision = recordDecision(extractedData);
        result.message = `✅ 已记录决策: ${extractedData.topic}`;
        break;

      case 'evaluate_opportunity':
        result.opportunity = recordOpportunity(extractedData);
        result.message = `✅ 已记录机会: ${extractedData.what}`;
        break;

      case 'record_lesson':
        result.lesson = recordLesson(extractedData);
        result.message = `✅ 已记录教训: ${extractedData.problem}`;
        break;

      case 'capture_idea':
        result.message = `💡 已捕获想法: ${extractedData.idea}`;
        break;
    }

    // 写入对话日志
    appendConversationLog({
      type: trigger.type,
      trigger: trigger.keyword,
      content: text.substring(0, 200),
      extracted: extractedData
    });

    results.push(result);
  }

  return results;
}

// 导出工具函数
export const MemoryManager = {
  processMemoryUpdate,
  updateState,
  recordDecision,
  recordOpportunity,
  recordLesson,
  detectTrigger
};
