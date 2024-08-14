const { exec, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const cleanUp = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.rm(dirPath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Error cleaning up directory ${dirPath}:`, err);
        return reject(err);
      }
      resolve();
    });
  });
};

const executeCppCode = (code, compilerFlags, timeoutValue, testCases, callback) => {
  const tempDir = path.join(__dirname, `../temp-${uuidv4()}`);
  const filePath = path.join(tempDir, 'temp.cpp');
  const executablePath = path.join(tempDir, 'temp.exe');

  fs.mkdirSync(tempDir);
  fs.writeFileSync(filePath, code);

  const compileCommand = `g++ ${filePath} -o ${executablePath} ${compilerFlags || ''}`;

  exec(compileCommand, { timeout: 5000, maxBuffer: 1024 * 1024 }, async (compileErr, stdout, stderr) => {
    if (compileErr) {
      await cleanUp(tempDir);
      return callback(stderr, null);
    }

    if (testCases.length === 0) {
      execFile(executablePath, { timeout: timeoutValue || 2000, maxBuffer: 1024 * 1024 }, async (runErr, runStdout, runStderr) => {
        await cleanUp(tempDir);
        if (runErr) {
          return callback(runStderr, null);
        }
        callback(null, runStdout);
      });
    } else {
      let testResults = [];
      for (const testCase of testCases) {
        const child = execFile(executablePath, { timeout: timeoutValue || 2000, maxBuffer: 1024 * 1024 }, async (runErr, runStdout, runStderr) => {
          const success = runStdout.trim() === testCase.expectedOutput.trim();
          testResults.push({ input: testCase.input, success, expected: testCase.expectedOutput, actual: runStdout.trim() });
        });

        if (testCase.input) {
          child.stdin.write(testCase.input + '\n');
          child.stdin.end();
        }

        await new Promise(resolve => setTimeout(resolve, timeoutValue || 2000));
      }
      await cleanUp(tempDir);
      callback(null, testResults);
    }
  });
};

module.exports = {
  executeCppCode,
};
