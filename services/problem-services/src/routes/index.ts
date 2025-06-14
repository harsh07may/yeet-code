import { Router } from "express";
import { problemsRouter } from "./problems.routes";

export const routes = Router();

routes.use("/v1", problemsRouter);
