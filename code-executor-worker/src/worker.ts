import { Job, QueueEvents, Worker } from "bullmq";
import Redis from "ioredis";
import axios from "axios"; // or use fetch if you prefer


import { runIsolateCodeV2 } from "./runner";

const redis = new Redis({
  host: "localhost",
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
 * @param {SubmissionJob} job.data - The submission job data
 *
 * @returns Promise that resolves when the job processing is complete
 */
async function handleJob(job: Job<SubmissionJob>): Promise<void> {
  const { problemId, language, code } = job.data;
  console.log(code, job.id);

  const result = await runIsolateCodeV2(code, language);
  console.log(`✅ Job ${job.id} result:`, result);

  await axios.post("http://localhost:3002/code-result", {
    jobId: job.id,
    output: result,
  });
}
