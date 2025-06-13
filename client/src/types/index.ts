export type Difficulty = "easy" | "medium" | "hard";
export type ProblemExample = {
  input: string;
  output: string;
  explanation: string;
};

export type Problem = {
  id: number;
  solved: boolean;
  title: string;
  difficulty: Difficulty;
  description?: string; //TODO: Make this non-nullable
  examples?: ProblemExample[]; //TODO: Make this non-nullable
};

/** Implement custom sorting for `tanstack/react-table`.
 * @see https://tanstack.com/table/v8/docs/guide/sorting
 */
export const difficultyOrder: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};
