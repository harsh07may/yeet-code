import React from "react";
import { notFound } from "next/navigation";

import CodeEditor from "@/components/editor/CodeEditor";
import { Heading1, Heading3, Paragraph } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { cn } from "@/lib/utils";
import Examples from "../_components/examples";
import { getProblemById } from "@/app/server/queries";

type Props = {
  params: Promise<{ id: string }>;
};

const difficultyStyles = {
  easy: "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400",
  medium:
    "border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  hard: "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400",
} as const;

async function ProblemPage({ params }: Props) {
  const id = parseInt((await params).id);
  const problem = await getProblemById(id);
  if (!problem) return notFound();

  return (
    <main className="h-screen w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full rounded-lg border"
      >
        {/* LEFT SECTION: PROBLEM DETAILS */}
        <ResizablePanel defaultSize={40} minSize={25}>
          <div className="h-full overflow-y-auto p-6 space-y-6 bg-background">
            {/* Title & Difficulty */}
            <div className="flex items-center justify-between">
              <Heading1 >{problem.title}</Heading1>
              <Badge
                variant="outline"
                className={cn(
                  "capitalize border font-semibold",
                  difficultyStyles[problem.difficulty]
                )}
              >
                {problem.difficulty}
              </Badge>
            </div>

            {/* Description */}
            <Paragraph className="text-muted-foreground">
              {problem.description}
            </Paragraph>

            {/* Examples */}
            <div>
              <Heading3 >Examples</Heading3>
              <div className="space-y-3">
                {problem.examples?.map((example, index) => (
                  <Examples key={index} {...example} />
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div>
              <Heading3 >Constraints</Heading3>
              <div className="space-y-2">
                {problem.constraints.map((constraint, index) => (
                  <Paragraph
                    className="rounded-md bg-accent p-3 text-sm"
                    key={index}
                  >
                    {constraint}
                  </Paragraph>
                ))}
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* RIGHT SECTION: CODE EDITOR */}
        <ResizablePanel defaultSize={60} minSize={40}>
          <div className="h-full overflow-y-auto p-6 space-y-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <Heading1>Code Editor</Heading1>
              {/* Optional: Add a Save / Reset button here */}
            </div>

            <div className="rounded-lg border shadow-sm bg-background">
              <CodeEditor codeSnippets={problem.codeSnippets} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

export default ProblemPage;
