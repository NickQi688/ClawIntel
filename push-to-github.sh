#!/bin/bash
# ClawIntel - 一键推送到 GitHub 脚本

echo "🚀 ClawIntel 部署脚本"
echo "===================="

# 进入项目目录
cd "$(dirname "$0")"

# 检查 Git 状态
echo "📋 检查 Git 状态..."
git status

# 显示远程仓库
echo ""
echo "📍 远程仓库："
git remote -v

# 推送代码
echo ""
echo "📤 正在推送到 GitHub..."
echo "如果提示输入密码："
echo "  用户名: NickQi688"
echo "  密码: 使用 GitHub Personal Access Token"
echo ""
echo "获取 Token: https://github.com/settings/tokens"
echo ""

git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "🌐 GitHub 仓库: https://github.com/NickQi688/ClawIntel"
    echo ""
    echo "📝 下一步:"
    echo "  1. 在 Railway 点击 'New Deploy' 重新部署"
    echo "  2. 或等待自动部署（几分钟内）"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "请手动执行以下命令："
    echo "  cd $(pwd)"
    echo "  git push origin main"
fi
