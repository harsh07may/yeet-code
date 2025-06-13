import { Badge } from "@/components/ui/badge";
import { PROBLEMS } from "@/constants";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
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
              <h1 className="text-2xl font-bold">{problem.title}</h1>
              <Badge
                variant="outline"
                className={cn("w-20", difficultyStyles[problem.difficulty])}
              >
                {problem.difficulty}
              </Badge>
            </div>
            <p>{problem.description}</p>
            <h3 className="font-bold">Examples:</h3>
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
            <h1 className="text-2xl font-bold">Code Editor</h1>
            <div className="relative flex justify-center items-center border rounded-2xl h-[600]">
              <p>MONACO CODE EDITOR</p>
              <div className="flex gap-2 absolute bottom-5 right-5">
                <Button variant="outline" className="cursor-pointer">
                  Run
                </Button>
                <Button variant="default" className="cursor-pointer">
                  Submit
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center border rounded-2xl h-[100]">
              <p>OUTPUT TERMINAL</p>
            </div>
          </section>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

export default ProblemPage;
