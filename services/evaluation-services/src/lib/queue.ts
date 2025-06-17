// lib/queue.ts
import { Queue } from "bullmq";

export const submissionQueue = new Queue("submissions", {
  connection: {
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
  },
});

export async function addJob(data: {
  programId: string;
  language: string;
  code: string;
}) {
  const job = await submissionQueue.add("process", data, { attempts: 3 });
  return job.id;
}
