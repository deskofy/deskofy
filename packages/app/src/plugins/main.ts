import { App } from 'electron';
import path from 'path';

import { CONFIG_ENVS } from '../global';
import { loadConfig } from '../load';
import { printLog } from '../utils/print';

type TPlugin = {
  init: (app: App) => void;
};

const { userConfig } = loadConfig(CONFIG_ENVS.CONFIG);

const loadMainPlugins = (app: App): void => {
  if (!userConfig.plugins || userConfig.plugins.length <= 0) {
    return;
  }

  userConfig.plugins.forEach(async (pluginPath): Promise<void> => {
    try {
      const absolutePath = path.resolve(process.cwd(), pluginPath);
      const plugin = (await import(absolutePath)) as TPlugin;

      if (typeof plugin.init === 'function') {
        plugin.init(app);

        printLog(`plugin loaded: ${pluginPath}`);
      }
    } catch {
      printLog('unable to load');
    }
  });
};

export { loadMainPlugins };
