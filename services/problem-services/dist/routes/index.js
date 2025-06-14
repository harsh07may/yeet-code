"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const problems_routes_1 = require("./problems.routes");
exports.routes = (0, express_1.Router)();
exports.routes.use("/v1", problems_routes_1.problemsRouter);
