import { Router } from "express";
import { evaluationRoutes } from "./evaluation.routes";

export const routes = Router();

routes.use('/v1',evaluationRoutes)