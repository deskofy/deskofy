import { contextBridge } from 'electron';

import { appIpcContext } from './preload/app';
import { electronIpcContext } from './preload/electron';
import { navigationIpcContext } from './preload/navigation';
import { networkIpcContext } from './preload/network';
import { notificationIpcContext } from './preload/notification';
import { versionIpcContext } from './preload/version';
import { windowIpcContext } from './preload/window';

const exposeIpcContexts = (): void => {
  contextBridge.exposeInMainWorld('deskofyVersion', versionIpcContext);

  contextBridge.exposeInMainWorld('deskofyElectron', electronIpcContext);

  contextBridge.exposeInMainWorld('deskofyApp', appIpcContext);

  contextBridge.exposeInMainWorld('deskofyWindow', windowIpcContext);

  contextBridge.exposeInMainWorld('deskofyNavigation', navigationIpcContext);

  contextBridge.exposeInMainWorld(
    'deskofyNotification',
    notificationIpcContext,
  );

  contextBridge.exposeInMainWorld('deskofyNetwork', networkIpcContext);
};

export { exposeIpcContexts };
