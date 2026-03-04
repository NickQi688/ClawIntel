#!/bin/bash
# 三方向情报系统 - 一键运行脚本
# 使用方法: bash 三方向情报系统-一键运行.sh [timeframe]
# 示例: bash 三方向情报系统-一键运行.sh 4h

TIMEFRAME=${1:-4h}
TIMESTAMP=$(date +"%Y%m%d-%H%M")
OUTPUT_DIR="Web 3.0/机会方向/币安内容挖矿"

echo "========================================="
echo "   三方向情报系统 - 一键运行"
echo "========================================="
echo "时间范围: $TIMEFRAME"
echo "开始时间: $(date)"
echo ""

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 1. 币圈价值信息
echo "📊 [1/3] 正在获取币圈价值信息..."
# 这里需要通过 Claude 调用 crypto-intel skill
echo "→ 请告诉 Claude: '帮我抓取过去${TIMEFRAME}的币圈资讯'"
echo ""

# 2. AI 价值信息
echo "🤖 [2/3] 正在获取 AI 价值信息..."
# 这里需要通过 Claude 调用 ai-intel skill
echo "→ 请告诉 Claude: '帮我抓取过去${TIMEFRAME}的AI动态'"
echo ""

# 3. 币安内容参考
echo "📝 [3/3] 正在生成币安广场内容..."
# 这里需要通过 Claude 调用 binance-content skill
echo "→ 请告诉 Claude: '生成今天的币安广场内容'"
echo ""

echo "========================================="
echo "完成时间: $(date)"
echo ""
echo "💡 提示："
echo "1. 依次向 Claude 发送上述三个指令"
echo "2. 等待每个 Skill 执行完成"
echo "3. 查看生成的文件并发布到币安广场"
echo ""
echo "📁 输出目录: $OUTPUT_DIR"
echo "========================================="
