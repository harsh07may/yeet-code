import { Badge } from "@/components/ui/badge";
import { PROBLEMS } from "@/constants";
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

async function ProblemPage({ params }: Props) {
  const id = parseInt((await params).id);
  const problem = PROBLEMS.find((p) => p.id === id);

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
          </section>
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* RIGHT SECTION: CODE EDITOR */}
        <ResizablePanel defaultSize={70}>
          <section className="p-4 space-y-4">
            <Heading1>Code Editor</Heading1>
            <CodeEditor langauge="javascript" defaultValue="//some comment" />
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
