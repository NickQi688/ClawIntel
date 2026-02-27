#!/bin/bash

# 数字分身启动脚本
# 适用于 macOS 和 Linux，可在多台电脑上使用

# 自动查找 My-Digital-Self 目录
find_digital_self() {
    # 常见的位置搜索
    local paths=(
        "$HOME/Documents/qukauiqiji/My-Digital-Self"
        "$HOME/Documents/My-Digital-Self"
        "$HOME/My-Digital-Self"
        "$(pwd)/My-Digital-Self"
        "$HOME/Desktop/My-Digital-Self"
        "$HOME/Downloads/My-Digital-Self"
    )

    # 如果有传入参数，使用参数路径
    if [ -n "$1" ]; then
        paths=("$1")
    fi

    # 尝试通过 find 命令搜索（在 home 目录下）
    local found_path=$(find "$HOME" -name "My-Digital-Self" -type d 2>/dev/null | head -n 1)

    if [ -n "$found_path" ] && [ -d "$found_path" ]; then
        echo "$found_path"
        return 0
    fi

    # 检查预设路径
    for path in "${paths[@]}"; do
        if [ -d "$path" ]; then
            echo "$path"
            return 0
        fi
    done

    return 1
}

# 主函数
main() {
    echo "🔍 正在查找数字分身目录..."

    DS_PATH=$(find_digital_self "$1")

    if [ $? -eq 0 ]; then
        echo "✅ 找到数字分身目录: $DS_PATH"
        echo ""
        echo "📋 启动指令（复制以下内容到 Claude Code）："
        echo ""
        echo "------------------------------------------------"
        awk '/\*\*激活指令开始：\*\*/,/\*\*激活指令结束：\*\*/ {if (!/\*\*激活指令/) print}' "$DS_PATH/BOOT.md"
        echo "------------------------------------------------"
        echo ""
        echo "💡 提示: 将上述内容复制粘贴到 Claude Code 中即可激活"
        echo ""
    else
        echo "❌ 未找到 My-Digital-Self 目录"
        echo ""
        echo "请尝试以下方法:"
        echo "1. 手动指定路径: $0 /path/to/My-Digital-Self"
        echo "2. 确保目录已通过 Git 同步到本机"
        echo "3. 检查目录名称是否为 'My-Digital-Self'"
        echo ""
        exit 1
    fi
}

main "$@"
