"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const errorHandler_1 = require("./middleware/errorHandler");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
// app.use(limiter);
// Routes
app.use("/api", routes_1.routes);
// Error handling
app.use(errorHandler_1.errorHandler);
app.listen(config_1.config.port, () => {
    console.log(`Problem service running on port http://localhost:${config_1.config.port}`);
});
