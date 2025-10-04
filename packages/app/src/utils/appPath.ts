import { app } from 'electron';
import path from 'path';

const appPath = (externalPath: string | string[]): string =>
  Array.isArray(externalPath)
    ? path.join(app.getAppPath(), ...externalPath)
    : path.join(app.getAppPath(), externalPath);

export { appPath };
