import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';

const appIpcContext = {
  getAppUrl: async (): Promise<any> => ipcRenderer.invoke('app:get-url'),
  quit: (): void => ipcRenderer.send('app:quit'),
  restart: (): void => ipcRenderer.send('app:restart'),
  getHistory: async (): Promise<any> => ipcRenderer.invoke('app:history:get'),
  filterHistory: async (filters: any): Promise<any> =>
    ipcRenderer.invoke('app:history:filter', filters),
  cleanHistory: (): void => ipcRenderer.send('app:history:clean'),
};

const registerAppIpcContext = (): void => {
  ipcMain.handle('app:get-url', async (event): Promise<string> => {
    const win = BrowserWindow.fromWebContents(event.sender);
    return win?.webContents.getURL() ?? '';
  });

  ipcMain.on('app:quit', (): void => {
    app.quit();
  });

  ipcMain.on('app:restart', (): void => {
    app.relaunch();
    app.exit(0);
  });

  ipcMain.handle('app:history:get', async (event): Promise<any> => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return [];
    }

    const navHist = win.webContents.navigationHistory;
    const entries = navHist.getAllEntries();

    return entries.map((entry) => ({
      url: entry.url,
      title: entry.title,
      timestamp: Date.now(),
    }));
  });

  ipcMain.handle('app:history:filter', async (event, filters): Promise<any> => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return [];
    }

    const navHist = win.webContents.navigationHistory;
    const entries = navHist.getAllEntries();

    let filtered = entries.map((entry) => ({
      url: entry.url,
      title: entry.title,
      timestamp: Date.now(),
    }));

    if (filters.url) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      filtered = filtered.filter((e) => e.url.includes(filters.url));
    }

    if (filters.title) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      filtered = filtered.filter((e) => e.title?.includes(filters.title));
    }

    return filtered;
  });

  ipcMain.on('app:history:clean', (event): void => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return;
    }

    win.webContents.navigationHistory.clear();
  });
};

export { appIpcContext, registerAppIpcContext };
