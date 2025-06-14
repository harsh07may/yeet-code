import { Router } from "express";
import { ProblemsController } from "../controllers/problems.controller";

export const problemsRouter = Router();
const problemController = new ProblemsController();

problemsRouter.get("/problems", problemController.getAllProblems);
problemsRouter.get("/problems/:id", problemController.getProblemById);
