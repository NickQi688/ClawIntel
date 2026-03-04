#!/bin/bash

# 数字分身快捷命令设置脚本
# 在多台电脑上使用，自动设置 alias

echo "🚀 设置数字分身快捷命令"
echo ""

# 检测 shell 类型
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
echo ""

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 检查是否已经存在 alias
if grep -q "alias boot-ds=" "$SHELL_CONFIG" 2>/dev/null; then
    echo "⚠️  alias 'boot-ds' 已存在"
    echo "如需更新，请手动编辑 $SHELL_CONFIG"
    echo ""
    read -p "是否要覆盖现有配置? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "取消操作"
        exit 0
    fi
    # 删除旧的 alias 行
    sed -i '' '/alias boot-ds=/d' "$SHELL_CONFIG" 2>/dev/null || sed -i '/alias boot-ds=/d' "$SHELL_CONFIG"
fi

# 添加 alias
echo "" >> "$SHELL_CONFIG"
echo "# 数字分身快捷命令" >> "$SHELL_CONFIG"
echo "alias boot-ds='$SCRIPT_DIR/boot.sh'" >> "$SHELL_CONFIG"

echo "✅ 已添加 alias 到 $SHELL_CONFIG"
echo ""
echo "📝 使用方法:"
echo "   1. 重新加载配置: source $SHELL_CONFIG"
echo "   2. 或重启终端"
echo "   3. 然后运行: boot-ds"
echo ""
echo "💡 提示: 以后在任何目录下只需输入 'boot-ds' 即可启动数字分身"
