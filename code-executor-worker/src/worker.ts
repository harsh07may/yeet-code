import { QueueEvents, Worker } from "bullmq";
import Redis from "ioredis";
import { runIsolatedCode } from "./runner";

const redis = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: 6379,
  maxRetriesPerRequest: null,
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
async function handleJob(job: { data: SubmissionJob }): Promise<void> {
  const { problemId, language, code } = job.data;
  const result = await runIsolatedCode(code, language);
  // saveResult( problemId, language, code, result)
  console.log(`processing completed:${result}`);
}
