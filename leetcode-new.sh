#!/bin/bash

# 快速创建 LeetCode 题目文件的便捷脚本
# 使用方法：
#   ./leetcode-new.sh                    # 从剪贴板读取 URL
#   ./leetcode-new.sh <url>              # 使用提供的 URL
#   ./leetcode-new.sh <url> <number> <dir> # 完整参数

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NODE_SCRIPT="$SCRIPT_DIR/create-leetcode.js"

# 如果没有提供参数，尝试从剪贴板读取
if [ $# -eq 0 ]; then
  if command -v pbcopy &> /dev/null; then
    # macOS - 从剪贴板读取，匹配第一个 LeetCode URL
    CLIPBOARD=$(pbpaste 2>/dev/null)
    # 使用更简单的正则表达式，兼容 bash 的 grep
    URL=$(echo "$CLIPBOARD" | grep -oE 'https://leetcode(-cn)?\.(com|cn)/problems/[^[:space:]?]+' | head -1)
  elif command -v xclip &> /dev/null; then
    # Linux
    CLIPBOARD=$(xclip -selection clipboard -o 2>/dev/null)
    URL=$(echo "$CLIPBOARD" | grep -oE 'https://leetcode(-cn)?\.(com|cn)/problems/[^[:space:]?]+' | head -1)
  fi
  
  if [ -z "$URL" ]; then
    echo "❌ 剪贴板中没有找到 LeetCode URL"
    echo ""
    echo "请提供 LeetCode 链接："
    read -r URL
  else
    echo "📋 从剪贴板读取到 URL: $URL"
  fi
  
  # 从剪贴板读取，只传递 URL
  node "$NODE_SCRIPT" "$URL"
else
  # 使用命令行参数
  URL="$1"
  if [ $# -eq 1 ]; then
    node "$NODE_SCRIPT" "$URL"
  elif [ $# -eq 2 ]; then
    node "$NODE_SCRIPT" "$URL" "$2"
  elif [ $# -eq 3 ]; then
    node "$NODE_SCRIPT" "$URL" "$2" "$3"
  else
    node "$NODE_SCRIPT" "$@"
  fi
fi

