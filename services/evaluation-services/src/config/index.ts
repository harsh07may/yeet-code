import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.string().transform(Number),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.toString());
  process.exit(1);
}

export const config = {
  port: parsed.data.PORT,
  jwtSecret: parsed.data.JWT_SECRET,
  databaseUrl: parsed.data.DATABASE_URL,
};
