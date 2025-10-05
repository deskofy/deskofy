import { spawn } from 'cross-spawn';
import path from 'path';

const runProjectFromConfig = (projectConfig: string | undefined): void => {
  if (!projectConfig) {
    return;
  }

  const completePath = path.resolve(process.cwd(), projectConfig);

  const appMain = require.resolve('@deskofy/app/dist/main.js');

  const child = spawn('npx', ['electron', appMain], {
    stdio: 'inherit',
    env: {
      ...process.env,
      DESKOFY_APP_CONFIG: completePath,
    },
  });

  child.on('close', (code) => {
    process.exit(code);
  });
};

export { runProjectFromConfig };
