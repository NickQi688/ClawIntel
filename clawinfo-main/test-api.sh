#!/bin/bash
# 简单的 API 测试脚本
echo "测试 ClawIntel API..."

# 测试 digests 接口
echo "1. 测试 /api/digests 接口"
curl -s "http://127.0.0.1:8767/api/digests?limit=1"

echo ""
echo "2. 测试 digests 接口（带 category 参数）"
curl -s "http://127.0.0.1:8767/api/digests?limit=1&category=crypto"
