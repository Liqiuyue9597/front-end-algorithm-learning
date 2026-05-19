# 行为面试题 & STAR 模板

> Canva 非常重视文化契合度，行为面试贯穿各轮。
> 必须用英文准备至少 2-3 个 STAR 故事。
> Canva 核心价值观：Be a force for good, Empower others, Be a good human, Set crazy big goals

---

## 一、高频行为面试题

### 协作类

1. **Tell me about a time you worked with a difficult team member. How did you handle it?**
   - 考察：冲突解决、同理心、沟通能力

2. **Describe a situation where you had to collaborate with a remote/cross-timezone team.**
   - 考察：异步沟通、主动性（直接对标 Canva 北京-悉尼协作）

3. **Tell me about a time you received critical feedback. How did you respond?**
   - 考察：成长心态、self-awareness

### 主动性 & 领导力

4. **Can you recall a time you went above and beyond your role?**
   - 考察：ownership、自驱力

5. **Tell me about a time you identified a problem no one else noticed and took action.**
   - 考察：主动发现问题、推动解决

6. **Describe a situation where you had to influence others without authority.**
   - 考察：影响力、说服能力

### 挑战 & 失败

7. **Tell me about your biggest failure. What did you learn?**
   - 考察：诚实、反思能力、成长心态

8. **Describe a time you had to make a decision with incomplete information.**
   - 考察：判断力、风险评估

9. **Tell me about a project that didn't go as planned. How did you adapt?**
   - 考察：灵活性、问题解决

### 技术决策

10. **Describe a time you had to make a trade-off between code quality and delivery speed.**
    - 考察：工程判断、务实

11. **Tell me about a technical disagreement you had with a colleague. How was it resolved?**
    - 考察：技术沟通、开放心态

12. **Tell me about a time you improved a process or system significantly.**
    - 考察：持续改进、量化思维

---

## 二、STAR 模板

### 模板结构

```
S (Situation) - 1-2 句背景
T (Task) - 你的职责/目标
A (Action) - 你具体做了什么（最重要，占 60% 篇幅）
R (Result) - 量化结果 + 学到了什么
```

### 示例 1：跨时区协作

```
S: In my previous role, our team was split between Beijing and a partner team 
   in the US (12-hour time difference). We needed to deliver a new payment 
   integration within 6 weeks.

T: As the frontend lead in Beijing, I was responsible for ensuring smooth 
   handoffs and avoiding blocked work due to timezone gaps.

A: I implemented three changes:
   1. Created detailed async design docs with decision records, so the US 
      team could review and comment overnight
   2. Set up a "daily handoff" Slack message template — each team summarized 
      progress, blockers, and decisions needed before their day ended
   3. Identified tasks that could be parallelized vs. those needing sync 
      discussion, and batched the sync items into our one overlapping hour

R: We delivered 4 days ahead of schedule. The async doc practice was adopted 
   by 3 other teams. I learned that over-communication in async settings 
   isn't a waste — it's an investment.
```

### 示例 2：技术分歧

```
S: While building a new feature, I proposed using Server-Side Rendering (SSR) 
   for SEO and performance. A senior colleague strongly preferred a 
   client-side SPA approach, arguing it was simpler to maintain.

T: I needed to either convince the team or find a compromise that addressed 
   both concerns — SEO performance AND maintainability.

A: Instead of debating opinions, I:
   1. Set up a quick prototype of both approaches (took 2 days)
   2. Ran Lighthouse audits showing SSR scored 95 vs SPA's 62 on performance
   3. Proposed a hybrid: SSR for landing/marketing pages (SEO-critical) and 
      SPA for the authenticated dashboard (where SEO doesn't matter)
   4. Documented the decision rationale in an ADR for future reference

R: The team unanimously agreed on the hybrid approach. Core Web Vitals 
   improved by 40% on public pages. I learned that data beats opinions, and 
   "both" is often better than "either/or."
```

### 示例 3：失败与学习

```
S: I once shipped a feature that passed all tests but caused a 15% increase 
   in page load time in production, which we only discovered 3 days later 
   through user complaints.

T: I needed to fix the performance regression immediately and prevent 
   similar issues in the future.

A: 
   1. Immediately rolled back the change and communicated the issue to 
      stakeholders within 1 hour
   2. Root cause: a third-party script I added was synchronously blocking 
      rendering — our test environment had faster connections that masked it
   3. Fixed: loaded the script asynchronously with a loading fallback
   4. Prevention: I set up automated Lighthouse CI in our pipeline with 
      performance budgets — any PR that regresses LCP by >10% gets flagged

R: The fix restored performance within hours. The Lighthouse CI caught 4 
   similar issues in the next quarter before they reached production. 
   I learned to always test under realistic network conditions, not just 
   "does it work."
```

---

## 三、Canva 特定问题

### Why Canva?

```
关键词：democratizing design, empowering creativity, global impact, 
engineering excellence with user empathy

示例回答框架：
1. 产品热爱："I've been using Canva for X and was impressed by how it makes 
   design accessible..."
2. 技术挑战："The scale of real-time collaboration across millions of users 
   is the kind of engineering challenge I thrive on..."
3. 文化契合："Canva's value of 'be a force for good' resonates with me 
   because..."
4. 中国市场："I'm excited about localizing a global product for China — it 
   requires deep understanding of both tech and culture..."
```

### Why Frontend?

```
示例框架：
1. 用户触点："Frontend is where technology meets the user — every pixel, 
   every interaction matters..."
2. 即时反馈："I love the immediate feedback loop of building interfaces..."
3. 复杂挑战："Modern frontend engineering involves real-time systems, 
   performance optimization, accessibility — it's far from 'just HTML'..."
```

### What's your biggest strength/weakness?

```
Strength 示例：
"I'm good at breaking down ambiguous problems into actionable steps. 
 For example, when we received a vague requirement to 'improve page speed,' 
 I systematically profiled, identified 3 bottlenecks, prioritized by impact, 
 and delivered a 45% improvement in 2 sprints."

Weakness 示例（要真实，且展示改进）：
"I used to over-engineer solutions — spending time on edge cases that might 
 never happen. I've learned to ship MVPs first and iterate based on real 
 usage data. Now I always ask: 'What's the simplest thing that could work?'"
```

---

## 四、准备 Checklist

- [ ] 准备 5 个 STAR 故事（覆盖：协作、失败、技术决策、主动性、跨时区）
- [ ] 每个故事的英文版练习到能**自然地**讲 2-3 分钟
- [ ] 研究 Canva 的价值观和文化（lifeatcanva.com）
- [ ] 使用 Canva 产品，能说出 1-2 个改进建议
- [ ] 准备 3 个问面试官的问题：
  - "What does a typical day look like for this team?"
  - "How does the Beijing team collaborate with Sydney?"
  - "What's the biggest technical challenge your team is facing right now?"

---

## 五、注意事项

1. **永远说"I"不说"We"**：面试官想知道**你**做了什么
2. **量化结果**：用数字说话（"reduced by 30%", "delivered 4 days early"）
3. **承认失败是安全的**：Canva 看重成长心态，不承认错误反而减分
4. **不要背诵**：听起来要像对话，不像演讲
5. **准备追问**：面试官会 deep dive，比如 "What would you do differently?"
