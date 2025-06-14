import { Request, Response } from "express";
import { httpStatusCodes } from "../utils/httpStatusCodes";
import { formResponse } from "../utils/formResponse";
import { prisma } from "../lib/prisma";

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
            id: true,
            explanation: true,
            input: true,
            output: true,
          },
        },
        codeSnippets: true,
        constraints: true,
      },
    });
    return res
      .status(httpStatusCodes[200].code)
      .json(formResponse(httpStatusCodes[200].code, allProblems));
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
