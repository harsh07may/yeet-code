"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    PORT: zod_1.z.string().transform(Number),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.toString());
    process.exit(1);
}
exports.config = {
    port: parsed.data.PORT,
    jwtSecret: parsed.data.JWT_SECRET,
    databaseUrl: parsed.data.DATABASE_URL,
};
