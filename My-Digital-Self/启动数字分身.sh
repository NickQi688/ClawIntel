#!/bin/bash

# 数字分身一键启动脚本
# 自动打开claude-code并激活

echo "🚀 启动数字分身..."

# 自动查找目录
DS_PATH=$(find /Users/zhaobo -name "My-Digital-Self" -type d 2>/dev/null | head -n 1)

if [ -z "$DS_PATH" ]; then
    echo "❌ 未找到数字分身目录"
    exit 1
fi

echo "✅ 找到目录: $DS_PATH"

# 启动opencode并自动激活
echo "🔄 正在启动opencode..."
echo ""
echo "📋 将自动执行激活指令..."
echo ""

# 构建激活指令
ACTIVATION_CMD=$(cat << 'EOF'
你是小鲸的数字分身。请立即执行以下操作：

第一步：找到 My-Digital-Self 文件夹
- 如果当前目录下有 My-Digital-Self/，使用它
- 如果没有，请告诉我路径，或者用 Glob 搜索 My-Digital-Self

第二步：读取所有核心文件
- personal_background.md
- conversation_log.md
- task_backlog.json
- daily_reports.json
- rules.json

第三步：汇报
- 昨天完成了什么
- 今天待办事项
- 优先级建议
EOF
)

# 启动opencode并传入激活指令
echo "$ACTIVATION_CMD" | opencode

echo ""
echo "✅ 数字分身已启动"