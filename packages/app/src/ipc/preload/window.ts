import {
  BrowserWindowConstructorOptions,
  ipcRenderer,
  IpcRenderer,
  IpcRendererEvent,
  Rectangle,
} from 'electron';

const windowIpcContext = {
  minimize: (): void => ipcRenderer.send('window:minimize'),
  maximize: (): void => ipcRenderer.send('window:maximize'),
  unmaximize: (): void => ipcRenderer.send('window:unmaximize'),
  close: (): void => ipcRenderer.send('window:close'),
  toggleFullScreen: (): void => ipcRenderer.send('window:toggleFullScreen'),
  focus: (): void => ipcRenderer.send('window:focus'),
  open: (
    url?: string,
    config?: Partial<BrowserWindowConstructorOptions>,
  ): void => ipcRenderer.send('window:open', { url, config }),
  getBounds: async (): Promise<Rectangle> =>
    ipcRenderer.invoke('window:getBounds') as unknown as Rectangle,
  setBounds: (bounds: Partial<Rectangle>): void =>
    ipcRenderer.send('window:setBounds', bounds),
  isMaximized: (
    callback: (event: IpcRendererEvent, state: boolean) => void,
  ): IpcRenderer => ipcRenderer.on('window:is-maximized', callback),
};

export { windowIpcContext };
