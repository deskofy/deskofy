import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
} from 'electron';

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

export { registerNavigationIpcContext };
