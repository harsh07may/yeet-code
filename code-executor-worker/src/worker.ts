import { Job, QueueEvents, Worker } from "bullmq";
import Redis from "ioredis";
import { runIsolatedCode } from "./runner";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

// ✅ Log successful connection
redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

// ❌ Log connection error
redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

const worker = new Worker("submissions", handleJob, { connection: redis })
  .on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error: ${JSON.stringify(err)}`);
  })
  .on("ready", () => {
    console.log("Worker is ready to process jobs");
  });

/**
 * Processes a submission job by executing the provided code in isolation and logging the result.
 * @param job.data - The submission job data
 * @param job.data.problemId - The identifier of the problem being submitted
 * @param job.data.language - The programming language of the submitted code
 * @param job.data.code - The source code to be executed
 *
 * @returns Promise that resolves when the job processing is complete
 */
async function handleJob(job: any) {
  console.log(job);
  // console.log(job);
  // const { problemId, language, code } = job.data;
  // console.log("Job received:", job.id, problemId, language, code);

  // const result = await runIsolatedCode(code, language);
  // console.log(`processing completed: ${result}`);
}
