import { spawn } from 'cross-spawn';
import { Listr } from 'listr2';
import path from 'path';

import { runNpxTsc } from '../../helpers/spawns/npxTsc';
import { isFileExists } from '../../utils/isFileExists';

const runProjectFromConfig = async (
  projectConfig: string | undefined,
): Promise<void> => {
  if (!projectConfig) {
    return;
  }

  const completePath = path.resolve(process.cwd(), projectConfig);

  const appMain = require.resolve('@deskofy/app/dist/index.js');

  let tasks = new Listr([], {
    rendererOptions: {
      showSubtasks: true,
    },
  });

  tasks.add([
    {
      task: async (undefined, task): Promise<void> => {
        if (!isFileExists('tsconfig.json')) {
          return;
        }

        task.title = 'Building source files...';

        try {
          await runNpxTsc();
        } catch {
          // Just ignore...
        }
      },
    },
    {
      task: async (undefined, task): Promise<void> => {
        task.title = 'Launching deskofy app...';

        const child = spawn('npx', ['electron', appMain], {
          stdio: 'inherit',
          env: {
            ...process.env,
            DESKOFY_APP_CONFIG: completePath,
          },
        });

        child.stdout?.on('data', (data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          process.stdout.write(data);
        });

        child.stderr?.on('data', (data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          process.stderr.write(data);
        });

        child.on('close', (code) => {
          process.exit(code);
        });
      },
    },
  ]);

  await tasks.run();
};

export { runProjectFromConfig };
