import { execSync } from "child_process";
import fs from "fs";
import tmp from "tmp";

/**
 * Executes the provided code in an isolated Docker container and returns the output.
 *
 * @param {string} code - The source code to be executed
 * @param {string} language - The programming language of the source code
 * @returns {Promise<string>} - A promise that resolves with the execution output as a string
 *
 * @remarks
 * Currently only supports Python code execution using Python 3.10 Docker image.
 * The code is executed in an isolated container with a 5 second timeout limit.
 * Temporary files are automatically cleaned up after execution.
 */

export const runIsolateCodeV2 = async (
  code: string,
  language: "python" | "javascript" | "java"
): Promise<string> => {
  let fileExtension: string;
  let dockerImage: string;
  let runCommand: string;
  let containerFilePath: string;
  let filename: string;

  switch (language) {
    case "java":
      fileExtension = ".java";
      dockerImage = "openjdk:21";
      filename = "Code";
      containerFilePath = "/tmp/Code.java";
      runCommand = `sh -c "javac ${containerFilePath} -d /tmp && java -cp /tmp ${filename}"`;
      break;
    case "javascript":
      fileExtension = ".js";
      dockerImage = "node:20";
      filename = "code";
      containerFilePath = "/code.js";
      runCommand = `node ${containerFilePath}`;
      break;
      break;
    case "python":
      fileExtension = ".py";
      dockerImage = "python:3.10";
      filename = "code";
      containerFilePath = "/code.py";
      runCommand = `python ${containerFilePath}`;
      break;

    default:
      throw new Error("Unsupported language");
  }

  const tmpFile = tmp.fileSync({ postfix: fileExtension });
  fs.writeFileSync(tmpFile.name, code);

  try {
    const output = execSync(
      `docker run --rm --cpus="0.5" --memory="512M" --cap-drop="ALL" --security-opt="seccomp=unconfined" --network="none" --read-only  --tmpfs /tmp -v ${tmpFile.name}:${containerFilePath} ${dockerImage} ${runCommand}`,
      { timeout: 5000, stdio: "pipe" }
    ).toString();

    return output;
  } catch (err: any) {
    if (err.stderr) {
      return err.stderr.toString();
    }
    return err.message || "Unknown error occurred";
  } finally {
    tmpFile.removeCallback();
  }
};
