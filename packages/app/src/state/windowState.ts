import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import path from 'path';

type TWindowStatePayload = {
  x: number | undefined;
  y: number | undefined;
  width: number | undefined;
  height: number | undefined;
  isMaximized: boolean | undefined;
  url: string | undefined;
};

const getWindowStateFilePath = (environment: string): string => {
  const dir = app.getPath('userData');
  return path.join(dir, `${environment}-window-state.json`);
};

const saveWindowState = (
  environment: string,
  windowConfig: BrowserWindow,
): void => {
  const pathToStore = getWindowStateFilePath(environment);

  const bounds = windowConfig.getBounds();
  const state: TWindowStatePayload = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    isMaximized: windowConfig.isMaximized(),
    url: windowConfig.webContents.getURL(),
  };

  fs.writeFileSync(pathToStore, JSON.stringify(state));
};

const loadWindowState = (environment: string): TWindowStatePayload => {
  try {
    const pathToRead = getWindowStateFilePath(environment);

    const parsedJSON = JSON.parse(
      fs.readFileSync(pathToRead, 'utf-8'),
    ) as TWindowStatePayload;
    const mappedJSON = parsedJSON as TWindowStatePayload;

    return mappedJSON;
  } catch {
    return {} as TWindowStatePayload;
  }
};

export type { TWindowStatePayload };

export { saveWindowState, loadWindowState };
