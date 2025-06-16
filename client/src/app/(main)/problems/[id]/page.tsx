import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

import CodeEditor from "@/components/editor/CodeEditor";

import { Heading1, Heading3, Paragraph } from "@/components/typography";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Problem } from "@/types";
import Examples from "../_components/examples";

type Props = {
  params: Promise<{ id: string }>;
};

const difficultyStyles = {
  easy: "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400",
  medium:
    "border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  hard: "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400",
} as const;

async function getProblemById(id: number): Promise<Problem | null> {
  try {
    const response = await fetch(`${BASE_URL}/problems/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch!");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching problems:", error);
    return null;
  }
}
async function ProblemPage({ params }: Props) {
  const id = parseInt((await params).id);
  const problem = await getProblemById(id);
  console.log(problem);
  if (!problem) return notFound();

  return (
    <main className="p-4 font-sans">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen rounded-lg border"
      >
        {/* LEFT SECTION: DETAILS */}
        <ResizablePanel defaultSize={30}>
          <section className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Heading1>{problem.title}</Heading1>
              <Badge
                variant="outline"
                className={cn("w-20", difficultyStyles[problem.difficulty])}
              >
                {problem.difficulty}
              </Badge>
            </div>
            <Paragraph>{problem.description}</Paragraph>
            <Heading3>Examples:</Heading3>
            {problem.examples &&
              problem.examples.map((example, index) => (
                <Examples key={index} {...example} />
              ))}
            <Heading3>Constrainsts:</Heading3>
            {problem.constraints.map((constraint, index) => (
              <Paragraph className="rounded-md bg-accent p-2" key={index}>
                {constraint}
              </Paragraph>
            ))}
          </section>
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* RIGHT SECTION: CODE EDITOR */}
        <ResizablePanel defaultSize={70}>
          <section className="p-4 space-y-4">
            <Heading1>Code Editor</Heading1>
            {/* TODO: Pass down problem.codeSnippets, based on selectedLanguage find the codeSnippet.code */}
            <CodeEditor codeSnippets={problem.codeSnippets} />
            <div className="flex justify-center items-center border rounded-2xl bg-accent">
              <Paragraph>OUTPUT TERMINAL</Paragraph>
            </div>
          </section>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

export default ProblemPage;
