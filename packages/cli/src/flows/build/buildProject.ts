import { TDeskofyConfigSchema } from '@deskofy/config';
import chalk from 'chalk';
import { build, CliOptions } from 'electron-builder';
import { Listr } from 'listr2';
import path from 'path';

import { loadConfig } from '../../helpers/loadConfig';
import { runNpxTsc } from '../../helpers/spawns/npxTsc';
import { isFileExists } from '../../utils/isFileExists';
import { printError, printLog } from '../../utils/printLog';
import { copyPackageJSON } from './helpers/copyPackageJSON';
import { copyRuntimeFiles } from './helpers/copyRuntimeFiles';
import { extractExternalFiles } from './helpers/extractExternalFiles';
import { setupBuildConfig } from './helpers/setupBuildConfig';

const appMainPath = require.resolve('@deskofy/app/dist/index.js');

const buildProject = async (config: string, target: string): Promise<void> => {
  const runningDir = process.cwd();

  const appDir = path.dirname(appMainPath);

  const resourcesDir = path.join(runningDir, 'resources');

  const outputDir = path.join(
    runningDir,
    'bin',
    '${channel}-${os}-${platform}-${name}-${version}',
  );

  let projectConfig: TDeskofyConfigSchema;

  let externalFiles: string[];

  let tasks = new Listr([], {
    rendererOptions: {
      showSubtasks: true,
    },
  });

  tasks.add([
    {
      task: async (undefined, task): Promise<void> => {
        task.title = `Loading project configuration file`;

        projectConfig = loadConfig(config);

        task.title = `Successfully loaded configuration for project ${chalk.greenBright(projectConfig.name)}`;
      },
    },
    {
      task: async (undefined, task): Promise<void> => {
        task.title = 'Extracting external files...';

        externalFiles = await extractExternalFiles(runningDir, projectConfig);
      },
    },
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
        task.title = 'Copying required files...';

        await copyRuntimeFiles(
          appDir,
          [
            path.join(runningDir, config),
            ...(externalFiles ? externalFiles : []),
          ],
          null,
        );

        await copyPackageJSON(runningDir, appDir);
      },
    },
    {
      task: async (undefined, task): Promise<void> => {
        task.title = 'Building deskofy application...';

        const buildConfig: CliOptions = await setupBuildConfig({
          target,
          projectConfig,
          appDir,
          outputDir,
          resourcesDir,
        });

        try {
          const results = await build(buildConfig);
          results.forEach((result) => printLog(` -> ${result}`));

          task.title = 'Project built successfully.';
        } catch (err) {
          printError(
            `Unable to compile project ${projectConfig.packageName}\n`,
            err,
          );
        }
      },
    },
  ]);

  await tasks.run();
};

export { buildProject };
