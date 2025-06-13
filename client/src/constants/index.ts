import { Problem } from "@/types";

export const MOBILE_BREAKPOINT = 768;

export const PROBLEMS: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    solved: true,
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
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
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "medium",
    solved: false,
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807, so return [7,0,8].",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
        explanation: "0 + 0 = 0.",
      },
    ],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    solved: false,
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
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
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    solved: false,
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
        explanation: "The merged array is [1,2,3], median is 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.5",
        explanation: "The merged array is [1,2,3,4], median is (2+3)/2 = 2.5.",
      },
    ],
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    solved: true,
    description:
      "Given a string s, return the longest palindromic substring in s.",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"bab" is a palindrome, though "aba" is also valid.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: '"bb" is the longest palindrome in the string.',
      },
    ],
  },
  {
    id: 6,
    title: "Reverse Integer",
    difficulty: "easy",
    solved: true,
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed.",
    examples: [
      {
        input: "x = 123",
        output: "321",
        explanation: "Reversing 123 gives 321.",
      },
      {
        input: "x = -120",
        output: "-21",
        explanation: "Reversing -120 gives -21.",
      },
    ],
  },
  {
    id: 7,
    title: "String to Integer (atoi)",
    difficulty: "medium",
    solved: false,
    description:
      "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
    examples: [
      {
        input: 's = "42"',
        output: "42",
        explanation: 'Just a normal conversion: "42" -> 42.',
      },
      {
        input: 's = "-42"',
        output: "-42",
        explanation: 'Whitespace is ignored; then "-42" is parsed.',
      },
    ],
  },
  {
    id: 8,
    title: "Palindrome Number",
    difficulty: "easy",
    solved: false,
    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads the same forward and backward.",
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "-121 reversed is 121-, which is not the same.",
      },
    ],
  },
];
