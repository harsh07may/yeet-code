import { Request, Response } from "express";
import { addJob } from "../lib/queue";
export class EvaluateController {
  async evaluateCode(req: Request, res: Response) {
    try {
      const {
        programId,
        language,
        code,
      }: { programId: string; language: string; code: string } = req.body;

      const jobId = await addJob({
        programId,
        code,
        language,
      });

      return res.status(200).json({
        jobId,
      });
    } catch (error) {}
  }
}
