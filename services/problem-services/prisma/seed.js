"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/lib/prisma");
const languages = [
    { name: "JavaScript" },
    { name: "Python" },
    { name: "Java" },
];
const problems = [
    {
        title: "Two Sum",
        difficulty: "easy",
        note: "Use a hash map for optimal solution.",
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
            },
        ],
        constraints: [
            { summary: "2 <= nums.length <= 10^4" },
            { summary: "-10^9 <= nums[i] <= 10^9" },
        ],
        codeSnippets: [
            { language: "JavaScript", code: `function twoSum(nums, target) {}` },
            { language: "Python", code: `def twoSum(nums, target):` },
        ],
    },
    {
        title: "Add Two Numbers",
        difficulty: "medium",
        note: "Linked list manipulation question.",
        examples: [
            {
                input: "l1 = [2,4,3], l2 = [5,6,4]",
                output: "[7,0,8]",
                explanation: "342 + 465 = 807, so return [7,0,8].",
            },
        ],
        constraints: [
            { summary: "The number of nodes in each list is in [1, 100]." },
        ],
        codeSnippets: [
            { language: "JavaScript", code: `function addTwoNumbers(l1, l2) {}` },
        ],
    },
    {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "medium",
        note: "Use sliding window to maintain current substring.",
        examples: [
            {
                input: 's = "abcabcbb"',
                output: "3",
                explanation: "The answer is 'abc', with the length of 3.",
            },
            {
                input: 's = "bbbbb"',
                output: "1",
                explanation: "The answer is 'b', with the length of 1.",
            },
        ],
        constraints: [
            { summary: "0 <= s.length <= 5 * 10^4" },
            {
                summary: "s consists of English letters, digits, symbols, and spaces.",
            },
        ],
        codeSnippets: [
            {
                language: "JavaScript",
                code: `function lengthOfLongestSubstring(s) {}`,
            },
            { language: "Python", code: `def lengthOfLongestSubstring(s):` },
        ],
    },
    {
        title: "Valid Parentheses",
        difficulty: "easy",
        note: "Use a stack to ensure valid nesting.",
        examples: [
            {
                input: 's = "()"',
                output: "true",
                explanation: "Parentheses are balanced.",
            },
            {
                input: 's = "([)]"',
                output: "false",
                explanation: "Incorrect order of brackets.",
            },
        ],
        constraints: [
            { summary: "1 <= s.length <= 10^4" },
            { summary: "s consists only of '(', ')', '{', '}', '[' and ']'." },
        ],
        codeSnippets: [
            { language: "JavaScript", code: `function isValid(s) {}` },
            { language: "Python", code: `def isValid(s):` },
        ],
    },
    {
        title: "Merge Two Sorted Lists",
        difficulty: "easy",
        note: "Use two pointers to merge iteratively or recursively.",
        examples: [
            {
                input: "l1 = [1,2,4], l2 = [1,3,4]",
                output: "[1,1,2,3,4,4]",
                explanation: "Merge maintaining order.",
            },
        ],
        constraints: [
            { summary: "The number of nodes in both lists is in the range [0, 50]." },
            { summary: "-100 <= Node.val <= 100" },
        ],
        codeSnippets: [
            { language: "JavaScript", code: `function mergeTwoLists(l1, l2) {}` },
            { language: "Python", code: `def mergeTwoLists(l1, l2):` },
        ],
    },
    {
        title: "Maximum Subarray",
        difficulty: "medium",
        note: "Use Kadane's Algorithm for a linear time solution.",
        examples: [
            {
                input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
                output: "6",
                explanation: "Subarray [4,-1,2,1] has the largest sum = 6.",
            },
        ],
        constraints: [
            { summary: "1 <= nums.length <= 10^5" },
            { summary: "-10^4 <= nums[i] <= 10^4" },
        ],
        codeSnippets: [
            { language: "JavaScript", code: `function maxSubArray(nums) {}` },
            { language: "Python", code: `def maxSubArray(nums):` },
        ],
    },
    {
        title: "Climbing Stairs",
        difficulty: "easy",
        note: "Classic dynamic programming problem.",
        examples: [
            {
                input: "n = 2",
                output: "2",
                explanation: "1+1 or 2.",
            },
            {
                input: "n = 3",
                output: "3",
                explanation: "1+1+1, 1+2, or 2+1.",
            },
        ],
        constraints: [{ summary: "1 <= n <= 45" }],
        codeSnippets: [
            { language: "JavaScript", code: `function climbStairs(n) {}` },
            { language: "Python", code: `def climbStairs(n):` },
        ],
    },
];
async function main() {
    // 1. Seed languages
    const languageMap = {};
    for (const lang of languages) {
        const created = await prisma_1.prisma.language.upsert({
            where: { name: lang.name },
            update: {},
            create: { name: lang.name },
        });
        languageMap[lang.name] = created.id;
    }
    // 2. Seed problems with examples, constraints, and code snippets
    for (const problem of problems) {
        const createdProblem = await prisma_1.prisma.problem.create({
            data: {
                title: problem.title,
                difficulty: problem.difficulty,
                note: problem.note,
                examples: {
                    create: problem.examples.map((ex) => ({
                        input: ex.input,
                        output: ex.output,
                        explanation: ex.explanation,
                    })),
                },
                constraints: {
                    create: problem.constraints.map((c) => ({
                        summary: c.summary,
                    })),
                },
                codeSnippets: {
                    create: problem.codeSnippets.map((snippet) => ({
                        code: snippet.code,
                        language: {
                            connect: {
                                id: languageMap[snippet.language],
                            },
                        },
                    })),
                },
            },
        });
        console.log(`✅ Created problem: ${createdProblem.title}`);
    }
}
main()
    .then(() => prisma_1.prisma.$disconnect())
    .catch(async (err) => {
    console.error("❌ Error seeding:", err);
    await prisma_1.prisma.$disconnect();
    process.exit(1);
});
