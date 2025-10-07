import { TDeskofyConfigSchema, validateConfigSchema } from '@deskofy/config';
import fs from 'fs-extra';
import JSON5 from 'json5';
import path from 'path';

type TLoadConfigResponse = {
  appConfig: {
    platform: string;
    arch: string;
    nodeVersion: string;
    electronVersion: string;
    chromeVersion: string;
  };
  userConfig: TDeskofyConfigSchema;
};

const loadConfig = (configPath: string): TLoadConfigResponse => {
  const possiblePaths: string[] = [];

  if (path.isAbsolute(configPath)) {
    possiblePaths.push(configPath);
  } else {
    possiblePaths.push(path.resolve(process.cwd(), configPath) as string);
  }

  possiblePaths.push(
    path.join(__dirname, configPath) as string,
    path.join(process.resourcesPath, configPath) as string,
    path.join(process.resourcesPath, 'app.asar', configPath) as string,
    path.join(process.resourcesPath, 'app.asar.unpacked', configPath) as string,
  );

  try {
    // eslint-disable-next-line
    const { app } = require('electron');

    if (app?.getAppPath) {
      possiblePaths.push(
        path.join(app.getAppPath() as string, configPath) as string,
      );
    }
  } catch {
    // Do nothing...
  }

  let parsedJSON: TDeskofyConfigSchema | null = null;
  let successfulPath: string | null = null;

  for (const tryPath of possiblePaths) {
    try {
      const content = fs.readFileSync(tryPath, 'utf-8') as string;
      parsedJSON = JSON5.parse(content) as TDeskofyConfigSchema;
      successfulPath = tryPath;
      break;
    } catch {
      continue;
    }
  }

  if (!parsedJSON || !successfulPath) {
    throw new Error(
      `Unable to find config file. Tried the following paths:\n${possiblePaths.map((p) => `  - ${p}`).join('\n')}`,
    );
  }

  const validatedJSON = validateConfigSchema(parsedJSON);
  if (!validatedJSON.isOk || validatedJSON.config === undefined) {
    throw new Error(
      `Unable to use the config file at "${successfulPath}" because: ${JSON.stringify(validatedJSON.error, null, 2)}`,
    );
  }

  return {
    appConfig: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      electronVersion: process.versions.electron,
      chromeVersion: process.versions.chrome,
    },
    userConfig: validatedJSON.config,
  };
};

export type { TLoadConfigResponse };

export { loadConfig };
