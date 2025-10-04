import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  ipcRenderer,
} from 'electron';

const navigationIpcContext = {
  canGoBack: async (): Promise<any> =>
    ipcRenderer.invoke('navigation:can-go-back'),
  canGoForward: async (): Promise<any> =>
    ipcRenderer.invoke('navigation:can-go-forward'),
  goBack: (): void => ipcRenderer.send('navigation:go-back'),
  goForward: (): void => ipcRenderer.send('navigation:go-forward'),
  cloneWindow: (): void => ipcRenderer.send('navigation:clone-window'),
};

const registerNavigationIpcContext = (
  browserWindowData: BrowserWindowConstructorOptions | undefined,
): void => {
  ipcMain.handle('navigation:can-go-back', (event): void | boolean => {
    const win = BrowserWindow.fromWebContents(event.sender);

    const navHist = win?.webContents.navigationHistory;
    return navHist?.canGoBack() ?? false;
  });

  ipcMain.handle('navigation:can-go-forward', (event): void | boolean => {
    const win = BrowserWindow.fromWebContents(event.sender);

    const navHist = win?.webContents.navigationHistory;
    return navHist?.canGoForward() ?? false;
  });

  ipcMain.on('navigation:go-back', (event): void | boolean => {
    const win = BrowserWindow.fromWebContents(event.sender);

    const navHist = win?.webContents.navigationHistory;
    return navHist?.goBack() ?? false;
  });

  ipcMain.on('navigation:go-forward', (event): void | boolean => {
    const win = BrowserWindow.fromWebContents(event.sender);

    const navHist = win?.webContents.navigationHistory;
    return navHist?.goForward() ?? false;
  });

  ipcMain.on('navigation:clone-window', (event): void => {
    const parentWindow = BrowserWindow.fromWebContents(event.sender);
    if (!parentWindow) {
      return;
    }

    const url = parentWindow.webContents.getURL();

    const newWin = new BrowserWindow({
      modal: true,
      ...browserWindowData,
    });

    newWin.loadURL(url);
  });
};

export { navigationIpcContext, registerNavigationIpcContext };
