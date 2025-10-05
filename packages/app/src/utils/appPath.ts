import { app } from 'electron';
import path from 'path';

const appPath = (externalPath: string | string[] | undefined): string => {
  if (externalPath === undefined) {
    return '';
  }

  return Array.isArray(externalPath)
    ? path.join(app.getAppPath(), ...externalPath)
    : path.join(app.getAppPath(), externalPath);
};

export { appPath };
