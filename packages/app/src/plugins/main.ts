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
      const resolvedPath = path.isAbsolute(pluginPath)
        ? pluginPath
        : path.resolve(process.cwd(), pluginPath);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const module = await import(resolvedPath);
      const plugin = module.default as TPlugin;

      if (typeof plugin.init === 'function') {
        plugin.init(deskofyApp);
      }
    } catch (e) {
      printLog(`unable to load main plugin: ${pluginPath}`, e);
    }
  });
};

export { loadMainPlugins };
