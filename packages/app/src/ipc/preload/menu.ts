import { ipcRenderer, MenuItemConstructorOptions } from 'electron';

const menuIpcContext = {
  setDynamic: (template: MenuItemConstructorOptions[]): void =>
    ipcRenderer.send('menu:set-dynamic', template),
  addDynamic: (template: MenuItemConstructorOptions[]): void =>
    ipcRenderer.send('menu:add-dynamic', template),
  clearDynamic: (): void => ipcRenderer.send('menu:clear-dynamic'),
};

export { menuIpcContext };
