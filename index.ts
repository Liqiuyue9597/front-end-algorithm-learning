function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let start = 0;
  let res = 0;
  
  for (let i = 0; i < s.length; i++) {
    const prevIndex = map.get(s[i]) ?? -1;
    // 检查：字符存在（prevIndex >= 0）且在当前窗口内（prevIndex >= start）
    if (prevIndex >= 0 && prevIndex >= start) {
      // 更新最大长度
      res = Math.max(res, i - start);
      // 移动窗口左边界到重复字符的下一个位置
      start = prevIndex + 1;
    }
    // 记录/更新当前字符的位置
    map.set(s[i], i);
  }
  
  // 最后再计算一次（处理整个字符串都没有重复的情况）
  res = Math.max(res, s.length - start);
  
  return res;
}

// ========== 调试代码 ==========
// 测试用例
const testCases = [
  { input: "abcabcbb", expected: 3 }, // "abc"
  { input: "bbbbb", expected: 1 },    // "b"
  { input: "pwwkew", expected: 3 },   // "wke"
  { input: "", expected: 0 },
  { input: " ", expected: 1 },
  { input: "dvdf", expected: 3 },     // "vdf"
  { input: "abba", expected: 2 },     // "ab"
];

console.log("开始测试...\n");

testCases.forEach((testCase, index) => {
  const result = lengthOfLongestSubstring(testCase.input);
  const passed = result === testCase.expected;
  
  console.log(`测试 ${index + 1}:`);
  console.log(`  输入: "${testCase.input}"`);
  console.log(`  期望: ${testCase.expected}`);
  console.log(`  结果: ${result}`);
  console.log(`  状态: ${passed ? "✅ 通过" : "❌ 失败"}`);
  console.log("");
});

// 详细调试单个测试用例
function debugSingleCase(s: string) {
  console.log(`\n详细调试: "${s}"`);
  console.log("=".repeat(50));
  
  const map = new Map<string, number>();
  let start = 0;
  let res = 0;
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const prevIndex = map.get(char);
    
    console.log(`\n位置 ${i}: 字符 "${char}"`);
    console.log(`  当前窗口: [${start}, ${i}] = "${s.substring(start, i + 1)}"`);
    
    if (prevIndex !== undefined && prevIndex >= start) {
      console.log(`  ⚠️  发现重复字符 "${char}" (之前出现在位置 ${prevIndex})`);
      res = Math.max(res, i - start);
      console.log(`  更新最大长度: ${res}`);
      start = prevIndex + 1;
      console.log(`  移动窗口起点到: ${start}`);
    }
    
    map.set(char, i);
    console.log(`  更新字符位置映射: "${char}" -> ${i}`);
  }
  
  res = Math.max(res, s.length - start);
  console.log(`\n最终结果: ${res}`);
  console.log("=".repeat(50));
}

// 取消注释下面这行来详细调试单个用例
debugSingleCase("abcabcbb");