#!/usr/bin/env node

/**
 * 快速创建 LeetCode 题目文件
 * 使用方法：
 * node create-leetcode.js <leetcode-url> [序号] [目录名]
 * 
 * 示例：
 * node create-leetcode.js https://leetcode-cn.com/problems/two-sum/ 1 microsoft
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 从 URL 提取题目信息
function extractProblemInfo(url) {
  // 支持 leetcode.com, leetcode-cn.com, leetcode.cn
  // 匹配格式: https://leetcode.cn/problems/xxx/ 或 https://leetcode-cn.com/problems/xxx/
  const match = url.match(/leetcode(?:-cn)?\.(?:com|cn)\/problems\/([^\/\?]+)/);
  if (!match) {
    throw new Error('无效的 LeetCode URL: ' + url);
  }
  
  const slug = match[1];
  // 将 slug 转换为标题格式（例如：two-sum -> Two Sum）
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // 清理 URL，移除查询参数，统一格式
  const cleanUrl = url.replace(/\/description.*$/, '').replace(/\?.*$/, '');
  
  return { slug, title, url: cleanUrl };
}

// 从剪贴板读取并提取第一个 LeetCode URL
function getUrlFromClipboard() {
  try {
    let text = '';
    if (process.platform === 'darwin') {
      text = execSync('pbpaste', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    } else if (process.platform === 'linux') {
      try {
        text = execSync('xclip -selection clipboard -o', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
      } catch {
        return null;
      }
    } else {
      return null;
    }
    const match = text.match(/https:\/\/leetcode(?:-cn)?\.(?:com|cn)\/problems\/[^\s?]+/);
    return match ? match[0].replace(/\?.*$/, '') : null;
  } catch {
    return null;
  }
}

// 获取下一个序号
function getNextNumber(directory) {
  const files = fs.readdirSync(directory);
  const numbers = files
    .filter(file => file.match(/^\[\d+\]/))
    .map(file => {
      const match = file.match(/^\[(\d+)\]/);
      return match ? parseInt(match[1]) : 0;
    });
  
  return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
}

// 创建题目文件
function createProblemFile(url, number, dirName) {
  const { slug, title, url: cleanUrl } = extractProblemInfo(url);
  
  // 确定目录
  const targetDir = dirName || 'microsoft';
  const dirPath = path.join(__dirname, targetDir);
  
  // 确保目录存在
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // 确定序号
  const fileNumber = number || getNextNumber(dirPath);
  
  // 创建文件名（限制长度，避免文件名过长）
  const fileName = `[${fileNumber}]${title.replace(/\s+/g, ' ').substring(0, 50)}.md`;
  const filePath = path.join(dirPath, fileName);
  
  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  文件已存在: ${filePath}`);
    return;
  }
  
  // 创建文件内容模板
  const content = `## ${title}
[${title}](${cleanUrl})：

### 思路


### 代码
\`\`\`js

\`\`\`
`;

  // 写入文件
  fs.writeFileSync(filePath, content, 'utf-8');
  
  console.log(`✅ 已创建文件: ${filePath}`);
  console.log(`📝 题目: ${title}`);
  console.log(`🔗 链接: ${cleanUrl}`);
  
  return filePath;
}

// 主函数
function main() {
  let args = process.argv.slice(2);
  let url = args[0];

  // 无参数时尝试从剪贴板读取 URL
  if (args.length === 0 || !url) {
    const clipUrl = getUrlFromClipboard();
    if (clipUrl) {
      console.log('📋 从剪贴板读取到 URL:', clipUrl);
      url = clipUrl;
      // args 保持为 [url], number 和 dirName 用 null
      args = [url];
    } else {
      console.log(`
使用方法：
  node create-leetcode.js <leetcode-url> [序号] [目录名]
  node create-leetcode.js                          # 无参数时从剪贴板读取 URL（需先复制题目链接）

示例：
  node create-leetcode.js https://leetcode-cn.com/problems/two-sum/
  node create-leetcode.js https://leetcode-cn.com/problems/two-sum/ 1 microsoft
  node create-leetcode.js https://leetcode.com/problems/two-sum/ 5 google

参数说明：
  leetcode-url: LeetCode 题目链接（必需，或从剪贴板读取）
  序号: 文件序号，如果不提供会自动计算下一个序号（可选）
  目录名: 目标目录，默认为 'microsoft'（可选）
    `);
      if (process.argv.length === 2) {
        console.log('❌ 剪贴板中未找到 LeetCode URL，请复制题目链接后重试，或直接传入 URL 参数。');
      }
      process.exit(1);
    }
  }

  const number = args[1] ? parseInt(args[1]) : null;
  const dirName = args[2] || null;

  try {
    createProblemFile(url, number, dirName);
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();

