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
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    solved: false,
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    solved: false,
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    solved: true,
    description:
      "Given a string s, return the longest palindromic substring in s.",
  },
  {
    id: 6,
    title: "Reverse Integer",
    difficulty: "easy",
    solved: true,
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed.",
  },
  {
    id: 7,
    title: "String to Integer (atoi)",
    difficulty: "medium",
    solved: false,
    description:
      "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
  },
  {
    id: 8,
    title: "Palindrome Number",
    difficulty: "easy",
    solved: false,
    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
  },
];
