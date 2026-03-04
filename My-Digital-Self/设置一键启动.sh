#!/bin/bash

# 设置"启动数字分身"全局命令

echo "🚀 设置一键启动命令..."

# 获取脚本目录
SCRIPT_DIR="/Users/a9999/Documents/qukauiqiji/My-Digital-Self"

# 检测shell类型
if [ -n "$ZSH_VERSION" ]; then
    SHELL_CONFIG="$HOME/.zshrc"
    SHELL_NAME="zsh"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_CONFIG="$HOME/.bashrc"
    if [ "$(uname)" == "Darwin" ]; then
        SHELL_CONFIG="$HOME/.bash_profile"
    fi
    SHELL_NAME="bash"
else
    echo "⚠️  未检测到 bash 或 zsh，请手动添加 alias"
    exit 1
fi

echo "检测到 shell: $SHELL_NAME"
echo "配置文件: $SHELL_CONFIG"

# 检查是否已存在
if grep -q "alias 启动数字分身=" "$SHELL_CONFIG" 2>/dev/null; then
    echo "⚠️  命令已存在，正在更新..."
    sed -i '' '/alias 启动数字分身=/d' "$SHELL_CONFIG" 2>/dev/null || sed -i '/alias 启动数字分身=/d' "$SHELL_CONFIG"
fi

# 添加alias
echo "" >> "$SHELL_CONFIG"
echo "# 数字分身一键启动" >> "$SHELL_CONFIG"
echo "alias 启动数字分身='$SCRIPT_DIR/启动数字分身.sh'" >> "$SHELL_CONFIG"

echo "✅ 已设置全局命令"
echo ""
echo "📝 使用方法："
echo "   1. 重新加载配置: source $SHELL_CONFIG"
echo "   2. 或重启终端"
echo "   3. 然后在任意目录输入: 启动数字分身"
echo ""
echo "💡 现在您可以在任何地方直接说'启动数字分身'了！"