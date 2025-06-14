"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemsController = void 0;
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const formResponse_1 = require("../utils/formResponse");
const prisma_1 = require("../lib/prisma");
class ProblemsController {
    async getAllProblems(req, res) {
        const allProblems = await prisma_1.prisma?.problem.findMany({
            select: {
                id: true,
                title: true,
                difficulty: true,
                note: true,
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
            .status(httpStatusCodes_1.httpStatusCodes[200].code)
            .json((0, formResponse_1.formResponse)(httpStatusCodes_1.httpStatusCodes[200].code, allProblems));
    }
    async getProblemById(req, res) {
        const { id } = req.params;
        // Validate that the ID is a number
        const problemId = parseInt(id);
        if (isNaN(problemId)) {
            return res
                .status(400)
                .json((0, formResponse_1.formResponse)(httpStatusCodes_1.httpStatusCodes[400].code, "Invalid problem ID"));
        }
        const problem = await prisma_1.prisma.problem.findUnique({
            where: { id: problemId },
            select: {
                id: true,
                title: true,
                difficulty: true,
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
                .json((0, formResponse_1.formResponse)(httpStatusCodes_1.httpStatusCodes[404].code, "Problem not found"));
        }
        return res
            .status(httpStatusCodes_1.httpStatusCodes[200].code)
            .json((0, formResponse_1.formResponse)(httpStatusCodes_1.httpStatusCodes[200].code, problem));
    }
}
exports.ProblemsController = ProblemsController;
