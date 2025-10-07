import { TDeskofyConfigSchema, validateConfigSchema } from '@deskofy/config';
import fs from 'fs-extra';
import JSON5 from 'json5';
import path from 'path';

const loadConfig = (configPath: string): TDeskofyConfigSchema => {
  const resolvedPath = path.isAbsolute(configPath)
    ? configPath
    : path.resolve(process.cwd(), configPath);

  const parsedJSON = JSON5.parse(
    fs.readFileSync(resolvedPath, 'utf-8'),
  ) as TDeskofyConfigSchema;

  const validatedJSON = validateConfigSchema(parsedJSON);
  if (!validatedJSON.isOk || validatedJSON.config === undefined) {
    throw new Error(
      `unable to use the given config file because: ${JSON.stringify(validatedJSON.error, null, 2)}`,
    );
  }

  return validatedJSON.config;
};

export { loadConfig };
