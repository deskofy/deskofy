import { IpcRenderer, ipcRenderer } from 'electron';

type TPlugin = {
  init: (deskofyIpcRenderer: IpcRenderer) => void;
};

let customRendererPlugins: Record<string, any> = {};

const initializeRendererPlugins = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userConfig = await ipcRenderer.invoke('internal:config:get');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { rendererPlugins = [] } = userConfig;

  for (const pluginPath of rendererPlugins) {
    if (!pluginPath || pluginPath.length === 0) {
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const mappedPluginPath = pluginPath.join('/');

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const code = await ipcRenderer.invoke(
        'internal:plugin:load-code',
        mappedPluginPath,
      );

      if (!code) {
        console.warn(`plugin file not found: ${mappedPluginPath}`);
        continue;
      }

      const blob = new Blob([code], { type: 'text/javascript' });
      const blobUrl = URL.createObjectURL(blob);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const module = await import(blobUrl);

      URL.revokeObjectURL(blobUrl);

      const plugin = module.default as TPlugin;

      if (typeof plugin.init === 'function') {
        customRendererPlugins[mappedPluginPath] = plugin.init(ipcRenderer);
      }
    } catch (e) {
      console.warn(`unable to load renderer plugin: ${mappedPluginPath}`, e);
    }
  }
};

initializeRendererPlugins();

export { customRendererPlugins };
