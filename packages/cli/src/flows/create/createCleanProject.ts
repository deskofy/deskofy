import chalk from 'chalk';
import { delay, Listr } from 'listr2';

import { runNpmInstall } from '../../helpers/spawns/npmInstall';
import { isDirectoryEmpty } from '../../utils/isDirectoryEmpty';
import { printError, printLog } from '../../utils/printLog';
import { createDeskofyConfig } from './helpers/createDeskofyConfig';
import { createESLintConfig } from './helpers/createESlintConfig';
import { createPackageJSON } from './helpers/createPackageJSON';
import { createPlugins } from './helpers/createPlugins';
import { createPrettierConfig } from './helpers/createPrettierConfig';
import { createTSConfig } from './helpers/createTSConfig';

type TProjectCreatePayload = {
  directoryToPerform: string;
  projectVersion: string;
  projectName: string;
  projectDescription: string;
  projectAuthor: string;
  packageName: string;
  domain: string;
  isEmpty: boolean;
};

const createCleanProject = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  if (!isDirectoryEmpty(payload.directoryToPerform)) {
    printError('Deskofy can only create new projects in an empty folder.');
    return;
  }

  printLog(
    `\n${chalk.cyan("✨ Let's create your")} ${chalk.green.bold('Deskofy')} ${chalk.cyan('project! 🚀')}\n`,
  );

  let tasks = new Listr([], {
    rendererOptions: {
      showSubtasks: true,
    },
  });

  if (payload.isEmpty) {
    tasks.add([
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Creating package.json';
          await delay(100);

          await createPackageJSON(payload);
          task.output = 'package.json created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Creating Deskofy configuration file';
          await delay(100);

          await createDeskofyConfig(payload);
          task.output = 'Deskofy config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Installing dependencies...';
          await delay(100);

          await runNpmInstall(payload);
        },
      },
    ]);
  }

  if (!payload.isEmpty) {
    tasks.add([
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Creating package.json';
          await delay(300);

          await createPackageJSON(payload);
          task.output = 'package.json created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Creating Prettier configuration';
          await delay(300);

          await createPrettierConfig(payload);
          task.output = 'Prettier config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Creating ESLint configuration';
          await delay(300);

          await createESLintConfig(payload);
          task.output = 'ESLint config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Creating TypeScript configuration';
          await delay(300);

          await createTSConfig(payload);
          task.output = 'TypeScript config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Creating Deskofy configuration file';
          await delay(300);

          await createDeskofyConfig(payload);
          task.output = 'Deskofy config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Create Deskofy plugins';
          await delay(300);

          await createPlugins(payload);
          task.output = 'Deskofy plugins created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.output = 'Installing dependencies...\n';
          await delay(300);

          await runNpmInstall(payload);
        },
      },
    ]);
  }

  await tasks.run();
};

export type { TProjectCreatePayload };

export { createCleanProject };
