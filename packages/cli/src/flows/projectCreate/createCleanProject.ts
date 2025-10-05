import { delay, Listr } from 'listr2';

import { isDirectoryEmpty } from '../../utils/isDirectoryEmpty';
import { printError } from '../../utils/printLog';
import { createDeskofyConfig } from './helpers/createDeskofyConfig';
import { createESLintConfig } from './helpers/createESlintConfig';
import { createPackageJSON } from './helpers/createPackageJSON';
import { createPrettierConfig } from './helpers/createPrettierConfig';
import { createTSConfig } from './helpers/createTSConfig';
import { installNPMDependencies } from './helpers/installNPMDependencies';

type TProjectCreatePayload = {
  directoryToPerform: string;
  projectName: string;
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

  let tasks = new Listr([]);

  if (payload.isEmpty) {
    tasks.add([
      {
        task: async (undefined, task): Promise<void> => {
          task.title = 'Creating package.json';
          await delay(1000);

          await createPackageJSON(payload);
          task.title = 'package.json created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.title = 'Creating Deskofy configuration file';
          await delay(1000);

          await createDeskofyConfig(payload);
          task.title = 'Deskofy config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.title = 'Installing dependencies...';
          await delay(1000);

          installNPMDependencies(payload);
        },
      },
    ]);
  }

  if (!payload.isEmpty) {
    tasks.add([
      {
        task: async (undefined, task): Promise<void> => {
          task.title = 'Creating package.json';
          await delay(1000);

          await createPackageJSON(payload);
          task.title = 'package.json created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.title = 'Creating Prettier configuration';
          await delay(1000);

          await createPrettierConfig(payload);
          task.title = 'Prettier config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.title = 'Creating ESLint configuration';
          await delay(1000);

          await createESLintConfig(payload);
          task.title = 'ESLint config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.title = 'Creating TypeScript configuration';
          await delay(1000);

          await createTSConfig(payload);
          task.title = 'TypeScript config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.title = 'Creating Deskofy configuration file';
          await delay(1000);

          await createDeskofyConfig(payload);
          task.title = 'Deskofy config created';
        },
      },
      {
        task: async (undefined, task): Promise<void> => {
          task.title = 'Installing dependencies...';
          await delay(1000);

          installNPMDependencies(payload);
        },
      },
    ]);
  }

  await tasks.run();
};

export type { TProjectCreatePayload };

export { createCleanProject };
