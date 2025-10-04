import {
  BrowserWindow,
  ipcMain,
  ipcRenderer,
  IpcRenderer,
  IpcRendererEvent,
  net,
} from 'electron';
import { networkInterfaces } from 'os';

type TNetworkStatus = {
  online: boolean;
};

type TIPInfo = {
  localIP: string | null;
  publicIP: string | null;
};

const networkIpcContext = {
  getStatus: async (): Promise<TNetworkStatus> =>
    ipcRenderer.invoke('network:status') as unknown as TNetworkStatus,
  onStatusChange: (
    callback: (event: IpcRendererEvent, status: TNetworkStatus) => void,
  ): IpcRenderer => ipcRenderer.on('network:status-change', callback),
  getIP: async (): Promise<TIPInfo> =>
    ipcRenderer.invoke('network:getIP') as unknown as TIPInfo,
  speedTest: async (): Promise<any> => ipcRenderer.invoke('network:speedTest'),
};

const registerNetworkIpcContext = (): void => {
  ipcMain.handle(
    'network:status',
    async (): Promise<TNetworkStatus> =>
      Promise.resolve({ online: net.isOnline() }),
  );

  // Monitor network status changes
  //
  // Note:
  //
  // Electron doesn't have built-in online/offline events in main
  // process. You'd need to implement polling or use a library
  setInterval(() => {
    const status = { online: net.isOnline() };

    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('network:status-change', status);
    });
  }, 5000); // Check every 5 seconds

  ipcMain.handle('network:getIP', async (): Promise<TIPInfo> => {
    // Get local IP

    const nets = networkInterfaces();
    let localIP: string | null = null;

    for (const name of Object.keys(nets)) {
      const netInterface = nets[name];
      if (!netInterface) {
        continue;
      }

      for (const net of netInterface) {
        // Skip internal and non-IPv4 addresses

        if (net.family === 'IPv4' && !net.internal) {
          localIP = net.address;
          break;
        }
      }
      if (localIP) break;
    }

    // Get public IP

    let publicIP: string | null = null;
    try {
      const response = await net.fetch('https://api.ipify.org?format=json');
      const data = (await response.json()) as { ip: string };
      publicIP = data.ip;
    } catch {
      // Just ignore...
    }

    return { localIP, publicIP };
  });

  ipcMain.handle('network:speedTest', async (): Promise<any> => {
    try {
      const testUrl =
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
      const startTime = Date.now();

      const response = await net.fetch(testUrl);
      const buffer = await response.arrayBuffer();

      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // seconds
      const sizeInBytes = buffer.byteLength;
      const sizeInMB = sizeInBytes / (1024 * 1024);
      const speedMbps = (sizeInMB * 8) / duration;

      return {
        downloadSpeed: speedMbps.toFixed(2),
        duration: duration.toFixed(2),
        size: sizeInMB.toFixed(2),
        unit: 'Mbps',
      };
    } catch (error) {
      return {
        error: 'Speed test failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
};

export { networkIpcContext, registerNetworkIpcContext };
