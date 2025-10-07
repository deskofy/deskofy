import { ipcRenderer } from 'electron';

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

export type { TNotificationOptions, TAlertOptions, TConfirmOptions };

export { notificationIpcContext };
