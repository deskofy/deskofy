import { ipcRenderer } from 'electron';

const navigationIpcContext = {
  canGoBack: async (): Promise<any> =>
    ipcRenderer.invoke('navigation:can-go-back'),
  canGoForward: async (): Promise<any> =>
    ipcRenderer.invoke('navigation:can-go-forward'),
  goBack: (): void => ipcRenderer.send('navigation:go-back'),
  goForward: (): void => ipcRenderer.send('navigation:go-forward'),
  cloneWindow: (): void => ipcRenderer.send('navigation:clone-window'),
};

export { navigationIpcContext };
