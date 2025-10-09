import { App } from 'electron';
import path from 'path';

import { CONFIG_ENVS } from '../global';
import { loadConfig } from '../load';
import { printLog } from '../utils/print';

type TPlugin = {
  init: (deskofyApp: App) => void;
};

const { userConfig } = loadConfig(CONFIG_ENVS.CONFIG);

const loadMainPlugins = (deskofyApp: App): void => {
  if (!userConfig.plugins || userConfig.plugins.length <= 0) {
    return;
  }

  userConfig.plugins.forEach(async (pluginPath): Promise<void> => {
    try {
      const mappedPath = path.join(...pluginPath);

      const possiblePaths: string[] = [];

      if (path.isAbsolute(mappedPath)) {
        possiblePaths.push(mappedPath);
      } else {
        possiblePaths.push(path.resolve(process.cwd(), mappedPath));
      }

      possiblePaths.push(
        path.join(__dirname, mappedPath) as string,
        path.join(process.resourcesPath, mappedPath) as string,
        path.join(process.resourcesPath, 'app.asar', mappedPath) as string,
        path.join(
          process.resourcesPath,
          'app.asar.unpacked',
          mappedPath,
        ) as string,
      );

      try {
        // eslint-disable-next-line
        const { app } = require('electron');

        if (app?.getAppPath) {
          possiblePaths.push(path.join(app.getAppPath() as string, mappedPath));
        }
      } catch {
        // Do nothing...
      }

      let module: any = null;
      let successfulPath: string | null = null;

      for (const tryPath of possiblePaths) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          module = await import(tryPath);
          successfulPath = tryPath;
          printLog(`Main plugin loaded successfully from: ${tryPath}`);
          break;
        } catch {
          continue;
        }
      }

      if (module) {
        const plugin = module.default as TPlugin;

        if (typeof plugin.init === 'function') {
          plugin.init(deskofyApp);
        } else {
          printLog(
            `Main plugin at "${successfulPath}" does not have an init function`,
          );
        }
      }
    } catch {
      // Do nothing...
    }
  });
};

export { loadMainPlugins };
