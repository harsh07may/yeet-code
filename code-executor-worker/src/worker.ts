import dotenv from "dotenv";
import axios from "axios";
import Redis from "ioredis";
import { Job, QueueEvents, Worker } from "bullmq";
import { runIsolateCodeV2 } from "./runner";

dotenv.config();

// Connection config for Upstash Redis
const connection = {
  host: process.env.REDIS_HOST!,
  port: 6379,
  password: process.env.REDIS_PASSWORD!,
  tls: {}, //  Required for Upstash Redis (TLS-only), comment if local redis
};

// Single connection to log Redis connection status
const diagnosticRedis = new Redis({
  host: connection.host,
  port: connection.port,
  password: connection.password,
  tls: connection.tls, // Comment if local redis
});

diagnosticRedis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

diagnosticRedis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// BullMQ Worker setup
const worker = new Worker("submissions", handleJob, { connection });

worker.on("ready", () => {
  console.log("Worker is ready to process jobs");
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${JSON.stringify(err)}`);
});

// QueueEvents to handle events like completed/failed etc.
const queueEvents = new QueueEvents("submissions", { connection });

queueEvents.on("completed", ({ jobId }) => {
  console.log(`Job ${jobId} completed`);
});

/**
 * Processes a submission job by executing the provided code in isolation and logging the result.
 */
async function handleJob(job: Job<SubmissionJob>): Promise<void> {
  const { problemId, language, code } = job.data;
  console.log(`Running job ${job.id} for problem ${problemId}`);

  const result = await runIsolateCodeV2(code, language);
  console.log(`Job ${job.id} result:`, result);

  await axios.post("http://localhost:3002/code-result", {
    jobId: job.id,
    output: result,
  });
}
