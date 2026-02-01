# front-end-algorithm-learning
JavaScript版本的算法学习

## 仓库原则
按照企业题库刷题并分析最优题解

## 快速创建新题目

### 方法一：使用 Shell 脚本（最便捷，推荐⭐）

**从剪贴板自动读取 LeetCode URL：**

1. 在浏览器中复制 LeetCode 题目链接（`Cmd+C`）
2. 运行脚本：
```bash
./leetcode-new.sh
```

**或者直接提供 URL：**
```bash
./leetcode-new.sh https://leetcode-cn.com/problems/two-sum/
```

### 方法二：使用 Node.js 脚本

```bash
# 基本用法（自动计算序号）
node create-leetcode.js https://leetcode-cn.com/problems/two-sum/

# 指定序号和目录
node create-leetcode.js https://leetcode-cn.com/problems/two-sum/ 1 microsoft

# 使用 npm 脚本
npm run create https://leetcode-cn.com/problems/two-sum/
```

### 方法三：设置 Shell 别名（全局使用）

在 `~/.zshrc` 中添加：

```bash
alias leetcode-new='cd /Users/elissali/github/other/front-end-algorithm-learning && ./leetcode-new.sh'
```

然后就可以在任何地方使用：

```bash
# 从剪贴板读取
leetcode-new

# 或直接提供 URL
leetcode-new https://leetcode-cn.com/problems/two-sum/
```

### 方法四：VS Code 任务

在 VS Code 中按 `Cmd+Shift+P`，输入 "Tasks: Run Task"，选择 "Create LeetCode Problem"，然后输入 LeetCode URL。

### Microsoft
- [two sum](https://github.com/Liqiuyue9597/front-end-algorithm-learning/blob/master/microsoft/%5B1%5Dtwo%20sum.md)
- [add two number](https://github.com/Liqiuyue9597/front-end-algorithm-learning/blob/master/microsoft/%5B2%5DAdd%20Two%20Number.md)