import { Router } from "express";
import { ProblemsController } from "../controllers/problems.controller";

export const problemsRouter = Router();
const problemController = new ProblemsController();

//TODO: Fix types for Controller
//@ts-ignore
problemsRouter.get("/problems", problemController.getAllProblems);
//@ts-ignore
problemsRouter.get("/problems/:id", problemController.getProblemById);
