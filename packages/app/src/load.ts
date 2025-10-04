import fs from 'fs';
import JSON5 from 'json5';
import path from 'path';

import { TDeskofyConfigSchema } from './config/schema';
import { validateConfigSchema } from './config/validate';

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
  const resolvedPath = path.join(__dirname, configPath);
  const parsedJSON = JSON5.parse(
    fs.readFileSync(resolvedPath, 'utf-8'),
  ) as TLoadConfigResponse;

  const validatedJSON = validateConfigSchema(parsedJSON);
  if (!validatedJSON.isOk || validatedJSON.config === undefined) {
    throw new Error(
      `unable to use the given config file because: ${JSON.stringify(validatedJSON.error, null, 2)}`,
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
