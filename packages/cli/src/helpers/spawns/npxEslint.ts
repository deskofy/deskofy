import { spawn } from 'child_process';

const runNpxEslint = async (): Promise<void> =>
  new Promise((resolve, reject) => {
    const child = spawn('npx', ['eslint', '.'], {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Linting failed with exit code ${code}`));
      } else {
        resolve();
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });

export { runNpxEslint };
