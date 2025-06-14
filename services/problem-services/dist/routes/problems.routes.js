"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemsRouter = void 0;
const express_1 = require("express");
const problems_controller_1 = require("../controllers/problems.controller");
exports.problemsRouter = (0, express_1.Router)();
const problemController = new problems_controller_1.ProblemsController();
exports.problemsRouter.get("/problems", problemController.getAllProblems);
exports.problemsRouter.get("/problems/:id", problemController.getProblemById);
