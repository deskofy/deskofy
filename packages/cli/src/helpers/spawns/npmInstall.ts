import { spawn } from 'child_process';

import { TProjectCreatePayload } from '../../flows/create/createCleanProject';

const runNpmInstall = async (payload: TProjectCreatePayload): Promise<void> =>
  new Promise((resolve, reject) => {
    const child = spawn('npm', ['install'], {
      cwd: payload.directoryToPerform,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`npm install failed with exit code ${code}`));
      } else {
        resolve();
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });

export { runNpmInstall };
