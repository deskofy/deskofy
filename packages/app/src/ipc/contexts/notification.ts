import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  ipcRenderer,
  Notification,
} from 'electron';

type TNotificationOptions = {
  title: string;
  body: string;
  actions?: { type: string; text: string }[];
  icon?: string;
  silent?: boolean;
};

type TAlertOptions = {
  type?: 'info' | 'warning' | 'error';
  title: string;
  message: string;
  buttons?: string[];
};

type TConfirmOptions = {
  title: string;
  message: string;
  detail?: string;
  buttons?: string[];
};

const notificationIpcContext = {
  show: (options: TNotificationOptions): void =>
    ipcRenderer.send('notification:show', options),
  setBadge: (count: number): void =>
    ipcRenderer.send('notification:badge', count),
  clear: (): void => ipcRenderer.send('notification:clear'),
  showAlert: async (options: TAlertOptions): Promise<void> =>
    ipcRenderer.invoke('alert:dialog', options) as unknown as void,
  showConfirm: async (options: TConfirmOptions): Promise<number> =>
    ipcRenderer.invoke('alert:confirm', options) as unknown as number,
};

const registerNotificationIpcContext = (parentWindow: BrowserWindow): void => {
  ipcMain.on(
    'notification:show',
    (event, options: TNotificationOptions): void => {
      if (!Notification.isSupported()) {
        return;
      }

      const notification = new Notification({
        title: options.title,
        body: options.body,
        icon: options.icon,
        silent: options.silent ?? false,
      });

      notification.show();

      notification.on('click', () => {
        const win = BrowserWindow.fromWebContents(event.sender);
        if (win) {
          if (win.isMinimized()) win.restore();
          win.focus();
        }
      });

      if (options.actions) {
        notification.on('action', (_, index) => {
          parentWindow?.webContents.send('notification:action-clicked', {
            index,
            action: options.actions?.[index],
          });
        });
      }
    },
  );

  ipcMain.on('notification:badge', (event, count: number): void => {
    if (process.platform === 'darwin') {
      app.dock?.setBadge(count > 0 ? count.toString() : '');
    } else if (process.platform === 'win32') {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (win) {
        // Windows uses overlay icon for badge

        if (count > 0) {
          // You'd need to create a badge icon here
          //
          // win.setOverlayIcon(badgeIcon, count.toString());
        } else {
          win.setOverlayIcon(null, '');
        }
      }
    } else if (process.platform === 'linux') {
      // Linux badge support varies by desktop
      // environment

      app.setBadgeCount(count);
    }
  });

  ipcMain.on('notification:clear', (): void => {
    // Note:
    //
    // Can't programmatically clear system notifications in Electron

    if (process.platform === 'darwin') {
      app.dock?.setBadge('');
    } else if (process.platform === 'linux') {
      app.setBadgeCount(0);
    }
  });

  ipcMain.handle(
    'alert:dialog',
    async (event, options: TAlertOptions): Promise<void> => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (!win) {
        return;
      }

      await dialog.showMessageBox(win, {
        type: options.type ?? 'info',
        title: options.title,
        message: options.message,
        buttons: options.buttons ?? ['OK'],
      });
    },
  );

  ipcMain.handle(
    'alert:confirm',
    async (event, options: TConfirmOptions): Promise<number> => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (!win) {
        return -1;
      }

      const result = await dialog.showMessageBox(win, {
        type: 'question',
        title: options.title,
        message: options.message,
        detail: options.detail,
        buttons: options.buttons ?? ['Cancel', 'OK'],
        defaultId: 1,
        cancelId: 0,
      });

      return result.response;
    },
  );
};

export { notificationIpcContext, registerNotificationIpcContext };
