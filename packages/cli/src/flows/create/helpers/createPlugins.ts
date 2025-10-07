import * as fs from 'fs/promises';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';

const deskofyPluginsToCreate = {
  mainPlugin: ['src', 'mainPluginSample.ts'],
  renderedPlugin: ['src', 'rendererPluginSample.ts'],
};

const deskofyPluginsToRun = {
  mainPlugin: ['runtime', 'mainPluginSample.js'],
  renderedPlugin: ['runtime', 'rendererPluginSample.js'],
};

const createPlugins = async (payload: TProjectCreatePayload): Promise<void> => {
  const mainPluginFile = `import { BrowserWindow, App } from 'electron';

const plugin = {
  init: (deskofyApp: App) => {
    console.log('Main plugin initialized:', deskofyApp);

    deskofyApp.whenReady().then(() => {
      const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
        show: true,
      });

      mainWindow.loadURL('data:text/html;charset=utf-8,' +
        encodeURIComponent('<h1>Hello from Main Plugin!</h1><p>This window was created by your plugin.</p>')
      );

      mainWindow.webContents.openDevTools();
      console.log('Window created and visible.');
    });

    deskofyApp.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        deskofyApp.quit();
      }
    });
  },
};

export default plugin;
`;

  const renderedPluginFile = `import type { IpcRenderer } from 'electron';

const plugin = {
  init: (deskofyIpcRenderer: IpcRenderer) => {
    // This will be printed in the browser console.
    console.log('Renderer plugin initialized:', deskofyIpcRenderer);
  },
};

export default plugin;
`;

  await fs.writeFile(
    path.join(payload.directoryToPerform, ...deskofyPluginsToCreate.mainPlugin),
    mainPluginFile,
  );

  await fs.writeFile(
    path.join(
      payload.directoryToPerform,
      ...deskofyPluginsToCreate.renderedPlugin,
    ),
    renderedPluginFile,
  );
};

export { deskofyPluginsToCreate, deskofyPluginsToRun, createPlugins };
