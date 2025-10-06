import { TDeskofyConfigSchema } from '@deskofy/config';
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  Menu,
  nativeTheme,
  shell,
} from 'electron';
import fs from 'fs-extra';
import path from 'path';

import { CONFIG_ENVS } from './global';
import { registerIpcContexts } from './ipc/register';
import { loadConfig } from './load';
import { setMenuTemplate } from './menu/menu';
import { loadMainPlugins } from './plugins/main';
import { loadWindowState, saveWindowState } from './state/windowState';
import { appPath } from './utils/appPath';

const { appConfig, userConfig } = loadConfig(CONFIG_ENVS.CONFIG);

const windowState = loadWindowState(userConfig.environment);

const browserWindowData: BrowserWindowConstructorOptions = {
  height: userConfig.windowOptions.shouldRestoreState
    ? (windowState.height ?? userConfig.windowSize.height)
    : userConfig.windowSize.height,
  width: userConfig.windowOptions.shouldRestoreState
    ? (windowState.width ?? userConfig.windowSize.width)
    : userConfig.windowSize.width,
  minHeight: userConfig.windowSize.minHeight,
  minWidth: userConfig.windowSize.minWidth,
  x: userConfig.windowOptions.shouldRestoreState
    ? (windowState.x ?? undefined)
    : undefined,
  y: userConfig.windowOptions.shouldRestoreState
    ? (windowState.y ?? undefined)
    : undefined,
  icon:
    appConfig.platform === 'darwin'
      ? appPath(userConfig.icons.mac)
      : appConfig.platform === 'windows'
        ? appPath(userConfig.icons.windows)
        : appConfig.platform === 'linux'
          ? appPath(userConfig.icons.linux)
          : undefined,
  backgroundColor: nativeTheme.shouldUseDarkColors
    ? userConfig.windowColors.dark
    : userConfig.windowColors.light,
  movable: userConfig.windowOptions.shouldMovable,
  minimizable: userConfig.windowOptions.shouldMinimizable,
  maximizable: userConfig.windowOptions.shouldMaximizable,
  closable: userConfig.windowOptions.shouldClosable,
  focusable: userConfig.windowOptions.shouldFocusable,
  fullscreenable: userConfig.windowOptions.shouldFullscreenable,
  frame: userConfig.windowLayout.shouldEnableFrame,
  hasShadow: userConfig.windowLayout.shouldEnableShadows,
  disableAutoHideCursor: userConfig.windowLayout.shouldDisableAutoHideCursor,
  enableLargerThanScreen: true,
  roundedCorners: userConfig.windowLayout.shouldHaveRoundCorners,
  titleBarStyle: userConfig.windowLayout.shouldHideTitleBar
    ? appConfig.platform === 'darwin'
      ? 'hiddenInset'
      : 'hidden'
    : 'default',
  ...(appConfig.platform === 'darwin'
    ? {
        titleBarOverlay: true,
      }
    : {}),
  webPreferences: {
    webSecurity: userConfig.highRisk.shouldEnableWebSecurity,
    allowRunningInsecureContent:
      userConfig.highRisk.shouldAllowRunningInsecureContent,
    experimentalFeatures: userConfig.highRisk.shouldEnableExperimentalFeatures,
    preload: path.join(__dirname, 'preload.js'),
    sandbox: true,
  },
  show: userConfig.windowStartup.shouldShowBeforeLoadingComplete,
};

let parentWindow: BrowserWindow;

const createWindow = (): void => {
  parentWindow = new BrowserWindow({
    ...browserWindowData,
  });

  const htmlPageForOfflineStatus = appPath(userConfig.htmlPages.offline);

  const htmlPageForNotAllowedStatus = appPath(
    userConfig.htmlPages.httpNotAllowed,
  );

  if (
    userConfig.windowStartup.shouldShowBeforeLoadingComplete &&
    userConfig.htmlPages.splashScreen
  ) {
    parentWindow.loadURL(appPath(userConfig.htmlPages.splashScreen));
  }

  parentWindow.loadURL(
    userConfig.windowOptions.shouldRestoreState
      ? (windowState.url ?? userConfig.domain)
      : userConfig.domain,
  );

  parentWindow.webContents.on(
    'did-fail-load',
    (_event, undefined, undefiend, validatedURL) => {
      if (validatedURL.startsWith('http')) {
        if (!userConfig.highRisk.shouldLoadHTTPDomains) {
          parentWindow?.loadFile(htmlPageForNotAllowedStatus);
          return;
        }
      }

      parentWindow?.loadFile(htmlPageForOfflineStatus);
    },
  );

  parentWindow.webContents.on('did-finish-load', (): void => {
    if (!userConfig.windowStartup.shouldShowBeforeLoadingComplete) {
      parentWindow.show();
    }
  });

  if (
    userConfig.environment === 'development' &&
    userConfig.development.shouldOpenDevToolsWhenRun
  ) {
    parentWindow.webContents.openDevTools();
  }

  parentWindow.on('close', () =>
    saveWindowState(userConfig.environment, parentWindow),
  );
};

const menu = Menu.buildFromTemplate(
  setMenuTemplate(appConfig.platform === 'darwin'),
);

Menu.setApplicationMenu(menu);

loadMainPlugins(app);

app.setName(userConfig.name);

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (appConfig.platform !== 'darwin') {
    app.quit();
  }
});

app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    delete webPreferences.preload;

    webPreferences.nodeIntegration = false;

    if (!params.src.startsWith(userConfig.domain)) {
      event.preventDefault();
    }
  });

  contents.setWindowOpenHandler(({ url }) => {
    if (userConfig.externalLinks.shouldOpenNonAppLinksExternally) {
      setImmediate(() => {
        shell.openExternal(url);
      });
    } else {
      const clonedWindow = new BrowserWindow({
        ...browserWindowData,
        parent: parentWindow,
      });

      clonedWindow.loadURL(url);
    }

    return {
      action: 'allow',
    };
  });
});

app.on('ready', () => {
  registerIpcContexts({
    parentWindow,
    browserWindowData: browserWindowData,
    isDarwin: appConfig.platform !== 'darwin',
  });
});

// The following custom IPC handlers facilitate communication and
// data exchange between the Electron main process (Node.js) and the
// renderer process (web view).

ipcMain.handle('internal:config:get', (): TDeskofyConfigSchema => userConfig);

ipcMain.handle(
  'internal:plugin:load-code',
  async (event, pluginPath: string) => {
    const possiblePaths: string[] = [];

    if (path.isAbsolute(pluginPath)) {
      possiblePaths.push(pluginPath);
    } else {
      possiblePaths.push(path.join(process.cwd(), pluginPath));
    }

    possiblePaths.push(
      path.join(__dirname, pluginPath),
      path.join(process.resourcesPath, pluginPath),
      path.join(process.resourcesPath, 'app.asar', pluginPath),
      path.join(process.resourcesPath, 'app.asar.unpacked', pluginPath),
    );

    try {
      // eslint-disable-next-line
      const { app } = require('electron');

      if (app?.getAppPath) {
        possiblePaths.push(path.join(app.getAppPath() as string, pluginPath));
      }
    } catch {
      // Do nothing...
    }

    for (const tryPath of possiblePaths) {
      try {
        const code = await fs.readFile(tryPath, 'utf-8');
        return code;
      } catch {
        continue;
      }
    }

    throw new Error(
      `Unable to find plugin file "${pluginPath}". Tried the following paths:\n${possiblePaths.map((p) => `  - ${p}`).join('\n')}`,
    );
  },
);
