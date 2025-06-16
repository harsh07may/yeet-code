export type Difficulty = "easy" | "medium" | "hard";
export type ProblemExample = {
  input: string;
  output: string;
  explanation: string;
};

export type Problem = {
  id: number;
  title: string;
  difficulty: Difficulty;
  description: string;
  solved: boolean;
  examples: ProblemExample[];
  codeSnippets: {
    code: string;
    language: string;
  }[];
  constraints: string[];
};

/** Implement custom sorting for `tanstack/react-table`.
 * @see https://tanstack.com/table/v8/docs/guide/sorting
 */
export const difficultyOrder: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};
