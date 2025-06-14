import { Router } from "express";
import { EvaluateController } from "../controllers/evaluate.controller";

export const evaluationRoutes = Router();

const evaluateController = new EvaluateController();

//TODO: Fix types for Controller
//@ts-ignore
evaluationRoutes.post("/evaluate/code", evaluateController.evaluateCode);
