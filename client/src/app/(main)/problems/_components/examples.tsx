import { ProblemExample } from "@/types";
import React from "react";

function Examples({ input, output, explanation }: ProblemExample) {
  return (
    <>
      <div className="rounded-md border p-4">
        <div>
          <strong>Input:</strong> {input}
        </div>
        <div>
          <strong>Output:</strong> {output}
        </div>
      </div>
      {explanation && (
        <div className="p-1">
          <strong>Explanation:</strong> {explanation}
        </div>
      )}
    </>
  );
}

export default Examples;
