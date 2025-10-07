import { ipcRenderer } from 'electron';

const appIpcContext = {
  getAppUrl: async (): Promise<any> => ipcRenderer.invoke('app:get-url'),
  quit: (): void => ipcRenderer.send('app:quit'),
  restart: (): void => ipcRenderer.send('app:restart'),
  getHistory: async (): Promise<any> => ipcRenderer.invoke('app:history:get'),
  filterHistory: async (filters: any): Promise<any> =>
    ipcRenderer.invoke('app:history:filter', filters),
  cleanHistory: (): void => ipcRenderer.send('app:history:clean'),
};

export { appIpcContext };
