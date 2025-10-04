import { app, MenuItem, MenuItemConstructorOptions } from 'electron';

const setMenuTemplate = (
  isDarwin: boolean,
): (MenuItemConstructorOptions | MenuItem)[] => {
  let menuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [];

  if (isDarwin) {
    menuTemplate.push({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }

  menuTemplate.push(
    {
      role: 'fileMenu',
    },
    {
      role: 'editMenu',
    },
    {
      role: 'viewMenu',
    },
    {
      role: 'windowMenu',
    },
    {
      role: 'help',
    },
  );

  return menuTemplate;
};

export { setMenuTemplate };
