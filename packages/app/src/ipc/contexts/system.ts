import * as os from 'os';
import {
  BrowserWindow,
  clipboard,
  ipcMain,
  ipcRenderer,
  nativeImage,
  NativeImage,
  nativeTheme,
  shell,
} from 'electron';

type TSystemInfo = {
  platform: string;
  arch: string;
  version: string;
  hostname: string;
  totalMemory: number;
  freeMemory: number;
  cpus: os.CpuInfo[];
  uptime: number;
};

const systemIpcContext = {
  getInfo: async (): Promise<TSystemInfo> =>
    ipcRenderer.invoke('system:info') as unknown as TSystemInfo,
  getTheme: async (): Promise<string> =>
    ipcRenderer.invoke('system:theme') as unknown as string,
  clipboardRead: async (): Promise<string> =>
    ipcRenderer.invoke('system:clipboard:read') as unknown as string,
  clipboardWrite: (text: string): void =>
    ipcRenderer.send('system:clipboard:write', text),
  clipboardReadImage: async (): Promise<string | null> =>
    ipcRenderer.invoke('system:clipboard:image:read') as unknown as
      | string
      | null,
  clipboardWriteImage: (dataUrl: string): void =>
    ipcRenderer.send('system:clipboard:image:write', dataUrl),
  openURL: (url: string): void => ipcRenderer.send('system:openURL', url),
};

const registerSystemIpcContext = (): void => {
  ipcMain.handle(
    'system:info',
    async (): Promise<TSystemInfo> =>
      Promise.resolve({
        platform: os.platform(),
        arch: os.arch(),
        version: os.release(),
        hostname: os.hostname(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpus: os.cpus(),
        uptime: os.uptime(),
      }),
  );

  ipcMain.handle(
    'system:theme',
    async (): Promise<string> =>
      nativeTheme.shouldUseDarkColors ? 'dark' : 'light',
  );

  nativeTheme.on('updated', () => {
    const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';

    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('system:theme-changed', theme);
    });
  });

  ipcMain.handle(
    'system:clipboard:read',
    async (): Promise<string> => clipboard.readText(),
  );

  ipcMain.on('system:clipboard:write', (event, text: string): void =>
    clipboard.writeText(text),
  );

  ipcMain.handle(
    'system:clipboard:image:read',
    async (): Promise<string | null> => {
      const image = clipboard.readImage();
      if (image.isEmpty()) {
        return null;
      }

      return image.toDataURL();
    },
  );

  ipcMain.on('system:clipboard:image:write', (event, dataUrl: string): void => {
    try {
      const img = nativeImage;
      const image = img.createFromDataURL(dataUrl);
      clipboard.writeImage(image as unknown as NativeImage);
    } catch {
      // Ignore...
    }
  });

  ipcMain.on('system:openURL', async (event, url: string): Promise<void> => {
    try {
      await shell.openExternal(url);
    } catch {
      // Ignore...
    }
  });
};

export { systemIpcContext, registerSystemIpcContext };
