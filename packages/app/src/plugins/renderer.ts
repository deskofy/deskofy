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
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const code = await ipcRenderer.invoke(
        'internal:plugin:load-code',
        pluginPath,
      );

      if (!code) {
        console.warn(`plugin file not found: ${pluginPath}`);
        continue;
      }

      const blob = new Blob([code], { type: 'text/javascript' });
      const blobUrl = URL.createObjectURL(blob);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const module = await import(blobUrl);

      URL.revokeObjectURL(blobUrl);

      const plugin = module.default as TPlugin;

      if (typeof plugin.init === 'function') {
        customRendererPlugins[pluginPath] = plugin.init(ipcRenderer);
      }
    } catch (e) {
      console.warn(`unable to load renderer plugin: ${pluginPath}`, e);
    }
  }
};

initializeRendererPlugins();

export { customRendererPlugins };
