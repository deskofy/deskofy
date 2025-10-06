import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  Menu,
  nativeTheme,
  shell,
} from 'electron';
import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';

import { TDeskofyConfigSchema } from './config/schema';
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
    const absPath = path.isAbsolute(pluginPath)
      ? pluginPath
      : path.join(process.cwd(), pluginPath);

    let code = await fs.readFile(absPath, 'utf-8');

    if (pluginPath.endsWith('.ts')) {
      const { code: transformedCode } = await esbuild.transform(code, {
        loader: 'ts',
        format: 'esm',
      });

      code = transformedCode;
    }

    return code;
  },
);
