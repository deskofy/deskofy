import { BrowserWindow, ipcMain, net } from 'electron';

import { TNetworkStatus } from '../preload/network';

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

export { registerNetworkIpcContext };
