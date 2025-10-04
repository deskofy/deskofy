import {
  ipcMain,
  ipcRenderer,
  Menu,
  MenuItemConstructorOptions,
} from 'electron';

import { setMenuTemplate } from '../../menu/menu';

const menuIpcContext = {
  setDynamic: (template: MenuItemConstructorOptions[]): void =>
    ipcRenderer.send('menu:set-dynamic', template),
  addDynamic: (template: MenuItemConstructorOptions[]): void =>
    ipcRenderer.send('menu:add-dynamic', template),
  clearDynamic: (): void => ipcRenderer.send('menu:clear-dynamic'),
};

const registerMenuIpcContext = (isDarwin: boolean): void => {
  let dynamicMenu: MenuItemConstructorOptions[] = [];

  const buildMenu = (isDarwin: boolean): void => {
    const baseTemplate = setMenuTemplate(isDarwin);
    const merged = [...baseTemplate, ...dynamicMenu];

    const menu = Menu.buildFromTemplate(merged);
    Menu.setApplicationMenu(menu);
  };

  ipcMain.on(
    'menu:set-dynamic',
    (_, template: MenuItemConstructorOptions[]) => {
      dynamicMenu = template;
      buildMenu(isDarwin);
    },
  );

  ipcMain.on(
    'menu:add-dynamic',
    (_, template: MenuItemConstructorOptions[]) => {
      dynamicMenu.push(...template);
      buildMenu(isDarwin);
    },
  );

  ipcMain.on('menu:clear-dynamic', () => {
    dynamicMenu = [];
    buildMenu(isDarwin);
  });
};

export { menuIpcContext, registerMenuIpcContext };
