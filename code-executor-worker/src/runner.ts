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
export async function runIsolatedCode(
  code: string,
  language: string
): Promise<string> {
  const tmpFile = tmp.fileSync({ postfix: ".py" });
  fs.writeFileSync(tmpFile.name, code);

  const output = execSync(
    `docker run --rm --cpus="0.5" --memory="512M" --cap-drop="ALL" --security-opt="seccomp=unconfined" --network="none" --read-only -v ${tmpFile.name}:/code.py python:3.10 python /code.py`,
    { timeout: 5000 }
  ).toString();

  tmpFile.removeCallback();
  return output;
}

// TODO: Create a language map and infer the docker command based on it.
// interface LanguageConfig {
//   image: string;
//   command: string;
//   extension: string;
// }

// const languageMap: Record<string, LanguageConfig> = {
//   python: {
//     image: "python:3.10",
//     command: "python",
//     extension: ".py",
//   },
// };

// if (!languageMap[language]) {
//   throw new Error(`Unsupported language: ${language}`);
// }

// const config = languageMap[language];
// const tmpFile = tmp.fileSync({ postfix: config.extension });
// fs.writeFileSync(tmpFile.name, code);

// const output = execSync(
//   `docker run --rm -v ${tmpFile.name}:/code${config.extension} ${config.image} ${config.command} /code${config.extension}`,
//   { timeout: 5000 }
// ).toString();
