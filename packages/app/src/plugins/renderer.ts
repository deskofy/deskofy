import { IpcRenderer, ipcRenderer } from 'electron';
import { CONFIG_ENVS } from 'global';
import { loadConfig } from 'load';
import path from 'path';
import { printLog } from 'utils/print';

type TPlugin = {
  init: (app: IpcRenderer) => void;
};

const { userConfig } = loadConfig(CONFIG_ENVS.CONFIG);

const { rendererPlugins } = userConfig;

let customRendererPlugins: Record<string, any> = {};

rendererPlugins.forEach(async (pluginPath): Promise<void> => {
  try {
    const absolutePath = path.resolve(process.cwd(), pluginPath);
    const plugin = (await import(absolutePath)) as TPlugin;

    if (typeof plugin.init === 'function') {
      customRendererPlugins[pluginPath] = plugin.init(ipcRenderer);

      printLog(`renderer plugin loaded: ${pluginPath}`);
    }
  } catch {
    printLog(`unable to load renderer plugin: ${pluginPath}`);
  }
});

export { customRendererPlugins };
