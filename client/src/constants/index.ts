import { Problem } from "@/types";

export const MOBILE_BREAKPOINT = 768;
export const BASE_URL = "http://localhost:3001/api/v1";

export const PROBLEMS: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    description:
      "Find two numbers in an array that add up to a specific target.",
    solved: false,
    examples: [
      {
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
      },
      {
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    codeSnippets: [
      { code: "def twoSum(nums, target):", language: "Python" },
      { code: "function twoSum(nums, target) {}", language: "JavaScript" },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "medium",
    description: "Add two numbers represented by linked lists.",
    solved: false,
    examples: [
      {
        explanation: "342 + 465 = 807, so return [7,0,8].",
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
      },
    ],
    codeSnippets: [
      { code: "function addTwoNumbers(l1, l2) {}", language: "JavaScript" },
    ],
    constraints: ["The number of nodes in each list is in [1, 100]."],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    description:
      "Find the length of the longest substring without repeating characters.",
    solved: false,
    examples: [
      {
        explanation: "The answer is 'abc', with the length of 3.",
        input: 's = "abcabcbb"',
        output: "3",
      },
      {
        explanation: "The answer is 'b', with the length of 1.",
        input: 's = "bbbbb"',
        output: "1",
      },
    ],
    codeSnippets: [
      { code: "def lengthOfLongestSubstring(s):", language: "Python" },
      {
        code: "function lengthOfLongestSubstring(s) {}",
        language: "JavaScript",
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols, and spaces.",
    ],
  },
  {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "easy",
    description: "Check if a string of parentheses is valid and balanced.",
    solved: false,
    examples: [
      {
        explanation: "Parentheses are balanced.",
        input: 's = "()"',
        output: "true",
      },
      {
        explanation: "Incorrect order of brackets.",
        input: 's = "([)]"',
        output: "false",
      },
    ],
    codeSnippets: [
      { code: "def isValid(s):", language: "Python" },
      { code: "function isValid(s) {}", language: "JavaScript" },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists only of '(', ')', '{', '}', '[' and ']'.",
    ],
  },
  {
    id: 5,
    title: "Merge Two Sorted Lists",
    difficulty: "easy",
    description: "Merge two sorted linked lists into one sorted list.",
    solved: false,
    examples: [
      {
        explanation: "Merge maintaining order.",
        input: "l1 = [1,2,4], l2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
    ],
    codeSnippets: [
      { code: "def mergeTwoLists(l1, l2):", language: "Python" },
      { code: "function mergeTwoLists(l1, l2) {}", language: "JavaScript" },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
    ],
  },
  {
    id: 6,
    title: "Maximum Subarray",
    difficulty: "medium",
    description: "Find the contiguous subarray with the largest sum.",
    solved: false,
    examples: [
      {
        explanation: "Subarray [4,-1,2,1] has the largest sum = 6.",
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
      },
    ],
    codeSnippets: [
      { code: "def maxSubArray(nums):", language: "Python" },
      { code: "function maxSubArray(nums) {}", language: "JavaScript" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
  },
  {
    id: 7,
    title: "Climbing Stairs",
    difficulty: "easy",
    description:
      "Calculate the number of ways to climb a staircase with n steps.",
    solved: false,
    examples: [
      { explanation: "1+1 or 2.", input: "n = 2", output: "2" },
      { explanation: "1+1+1, 1+2, or 2+1.", input: "n = 3", output: "3" },
    ],
    codeSnippets: [
      { code: "def climbStairs(n):", language: "Python" },
      { code: "function climbStairs(n) {}", language: "JavaScript" },
    ],
    constraints: ["1 <= n <= 45"],
  },
];
