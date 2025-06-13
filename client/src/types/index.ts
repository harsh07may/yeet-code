export type Difficulty = "easy" | "medium" | "hard";

//* Use a Zod schema here if requried.
export type Problem = {
  id: number;
  solved: boolean;
  title: string;
  difficulty: Difficulty;
  description?: string;
};

/** Implement custom sorting for `tanstack/react-table`.
 * @see https://tanstack.com/table/v8/docs/guide/sorting
 */
export const difficultyOrder: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};
