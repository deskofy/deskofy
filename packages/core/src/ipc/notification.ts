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

type TDeskofyNotification = {
  show: (options: TNotificationOptions) => void;
  setBadge: (count: number) => void;
  clear: () => void;
  showAlert: (options: TAlertOptions) => Promise<void>;
  showConfirm: (options: TConfirmOptions) => Promise<number>;
};

const deskofyNotification = (): TDeskofyNotification | undefined => {
  if (typeof window === 'undefined' || !(window as any).deskofyNotification) {
    return undefined;
  }

  const ctx = (window as any).deskofyNotification;

  return {
    show: ctx.show,
    setBadge: ctx.setBadge,
    clear: ctx.clear,
    showAlert: ctx.showAlert,
    showConfirm: ctx.showConfirm,
  };
};

export type { TDeskofyNotification };

export { deskofyNotification };
