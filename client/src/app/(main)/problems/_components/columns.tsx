"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Difficulty, difficultyOrder, Problem } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, Youtube } from "lucide-react";
import Link from "next/link";

/**
 * Custom styles for difficulty badges.
 * @description Tailwind scans the entire component to create stylesheet to set styles dynamically.
 * @see https://tailwindcss.com/docs/detecting-classes-in-source-files#how-classes-are-detected
 */
const difficultyStyles = {
  easy: "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400",
  medium:
    "border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  hard: "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400",
} as const;
//TODO: Move this to Badge component in future.

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "solved",
    header: () => <div className="text-center">Status</div>,

    //? TODO: Either disable this or update onChange.
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={!!row.getValue("solved")}
          aria-label="Solved status"
          disabled
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const id = row.original.id;

      return (
        <Link href={`/problems/${id}`} className="underline">
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    /** Override default alphabetical sorting behaviour(ie. Medium > Hard > Easy). */
    sortingFn: (rowA, rowB, columnId) => {
      const a = difficultyOrder[rowA.getValue(columnId) as Difficulty];
      const b = difficultyOrder[rowB.getValue(columnId) as Difficulty];
      return a - b;
    },
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as Difficulty;
      return (
        <div className="text-">
          <Badge
            variant="outline"
            className={cn("w-20", difficultyStyles[difficulty])} // 200iq play right here, maybe move this to a diffirent component if reused.
          >
            {difficulty}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "Solution",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const url = new URL(`https://www.youtube.com/results`);
      url.searchParams.set("search_query", title + " DSA");
      return (
        <Link target="_blank" href={url}>
          <Youtube className="text-red-500" />
        </Link>
      );
    },
  },
];
