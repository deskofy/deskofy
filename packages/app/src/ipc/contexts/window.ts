import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  Rectangle,
} from 'electron';

const registerWindowIpcContext = (
  browserWindowData: BrowserWindowConstructorOptions,
): void => {
  ipcMain.on('window:minimize', (event): void => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.minimize();
  });

  ipcMain.on('window:maximize', (event): void => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win?.isMaximized()) {
      win.unmaximize();
    } else {
      win?.maximize();
    }
  });

  ipcMain.on('window:unmaximize', (event): void => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.unmaximize();
  });

  ipcMain.on('window:close', (event): void => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.close();
  });

  ipcMain.on('window:toggleFullScreen', (event): void => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return;
    }

    win.setFullScreen(!win.isFullScreen());
  });

  ipcMain.on('window:focus', (event): void => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return;
    }

    if (win.isMinimized()) {
      win.restore();
    }

    win.focus();
  });

  ipcMain.on(
    'window:open',
    (
      event,
      data: { url?: string; config?: Partial<BrowserWindowConstructorOptions> },
    ): void => {
      const { url, config } = data;

      const newWin = new BrowserWindow({
        ...browserWindowData,
        ...config,
      });

      if (url) {
        newWin.loadURL(url);
      } else {
        // Load default URL or same as parent

        const parentWin = BrowserWindow.fromWebContents(event.sender);
        const parentUrl = parentWin?.webContents.getURL();

        if (parentUrl) {
          newWin.loadURL(parentUrl);
        }
      }
    },
  );

  ipcMain.handle('window:getBounds', (event): Rectangle | null => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return null;
    }

    return win.getBounds();
  });

  ipcMain.on('window:setBounds', (event, bounds: Partial<Rectangle>): void => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return;
    }

    const currentBounds = win.getBounds();
    win.setBounds({
      ...currentBounds,
      ...bounds,
    });
  });
};

export { registerWindowIpcContext };
