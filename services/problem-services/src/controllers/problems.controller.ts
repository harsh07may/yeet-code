import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { formResponse } from "../utils/formResponse";
import { httpStatusCodes } from "../utils/httpStatusCodes";

export class ProblemsController {
  async getAllProblems(req: Request, res: Response) {
    const allProblems = await prisma?.problem.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        note: true,
        description: true,
        solved: true,
        examples: {
          select: {
            explanation: true,
            input: true,
            output: true,
          },
        },
        codeSnippets: {
          select: {
            code: true,
            language: {
              select: {
                name: true,
              },
            },
          },
        },
        constraints: {
          select: {
            summary: true,
          },
        },
      },
    });

    // Transform result to match client-side type
    const formattedProblems = allProblems.map((problem) => ({
      id: problem.id,
      title: problem.title,
      difficulty: problem.difficulty,
      description: problem.description,
      solved: problem.solved,
      examples: problem.examples,
      codeSnippets: problem.codeSnippets.map((snippet) => ({
        code: snippet.code,
        language: snippet.language.name,
      })),
      constraints: problem.constraints.map((c) => c.summary),
    }));

    return res
      .status(httpStatusCodes[200].code)
      .json(formResponse(httpStatusCodes[200].code, formattedProblems));
  }
  async getProblemById(req: Request, res: Response) {
    const { id } = req.params;

    // Validate that the ID is a number
    const problemId = parseInt(id);
    if (isNaN(problemId)) {
      return res
        .status(400)
        .json(formResponse(httpStatusCodes[400].code, "Invalid problem ID"));
    }

    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      select: {
        id: true,
        title: true,
        difficulty: true,
        description: true,
        solved: true,
        note: true,
        examples: {
          select: {
            id: true,
            input: true,
            output: true,
            explanation: true,
          },
        },
        constraints: true,
        codeSnippets: {
          select: {
            id: true,
            code: true,
            language: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!problem) {
      return res
        .status(404)
        .json(formResponse(httpStatusCodes[404].code, "Problem not found"));
    }

    return res
      .status(httpStatusCodes[200].code)
      .json(formResponse(httpStatusCodes[200].code, problem));
  }
}
