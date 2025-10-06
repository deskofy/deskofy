import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

import { registerAppIpcContext } from './contexts/app';
import { registerMenuIpcContext } from './contexts/menu';
import { registerNavigationIpcContext } from './contexts/navigation';
import { registerNetworkIpcContext } from './contexts/network';
import { registerNotificationIpcContext } from './contexts/notification';
import { registerWindowIpcContext } from './contexts/window';

type TRegisterIpcContextPayload = {
  parentWindow: BrowserWindow;
  browserWindowData: BrowserWindowConstructorOptions;
  isDarwin: boolean;
};

const registerIpcContexts = (payload: TRegisterIpcContextPayload): void => {
  registerWindowIpcContext(payload.browserWindowData);
  registerAppIpcContext();
  registerNavigationIpcContext(payload.browserWindowData);
  registerMenuIpcContext(payload.isDarwin);
  registerNotificationIpcContext(payload.parentWindow);
  registerNetworkIpcContext();
};

export { registerIpcContexts };
