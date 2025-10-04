import { contextBridge } from 'electron';

import { appIpcContext } from './contexts/app';
import { electronIpcContext } from './contexts/electron';
import { menuIpcContext } from './contexts/menu';
import { navigationIpcContext } from './contexts/navigation';
import { networkIpcContext } from './contexts/network';
import { notificationIpcContext } from './contexts/notification';
import { systemIpcContext } from './contexts/system';
import { versionIpcContext } from './contexts/version';
import { windowIpcContext } from './contexts/window';

const exposeIpcContexts = (): void => {
  contextBridge.exposeInMainWorld('deskofyVersion', versionIpcContext);

  contextBridge.exposeInMainWorld('deskofyElectron', electronIpcContext);

  contextBridge.exposeInMainWorld('deskofyApp', appIpcContext);

  contextBridge.exposeInMainWorld('deskofyWindow', windowIpcContext);

  contextBridge.exposeInMainWorld('deskofyNavigation', navigationIpcContext);

  contextBridge.exposeInMainWorld('deskofyMenu', menuIpcContext);

  contextBridge.exposeInMainWorld(
    'deskofyNotification',
    notificationIpcContext,
  );

  contextBridge.exposeInMainWorld('deskofyNetwork', networkIpcContext);

  contextBridge.exposeInMainWorld('deskofySystem', systemIpcContext);
};

export { exposeIpcContexts };
