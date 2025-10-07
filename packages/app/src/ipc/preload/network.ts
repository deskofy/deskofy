import { IpcRenderer, ipcRenderer, IpcRendererEvent } from 'electron';

type TNetworkStatus = {
  online: boolean;
};

const networkIpcContext = {
  getStatus: async (): Promise<TNetworkStatus> =>
    ipcRenderer.invoke('network:status') as unknown as TNetworkStatus,
  onStatusChange: (
    callback: (event: IpcRendererEvent, status: TNetworkStatus) => void,
  ): IpcRenderer => ipcRenderer.on('network:status-change', callback),
  speedTest: async (): Promise<any> => ipcRenderer.invoke('network:speedTest'),
};

export type { TNetworkStatus };

export { networkIpcContext };
