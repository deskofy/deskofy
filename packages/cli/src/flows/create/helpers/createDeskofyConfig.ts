import * as fs from 'fs/promises';
import { TDeskofyConfigSchema } from '@deskofy/config';
import JSON5 from 'json5';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';
import { deskofyPluginsToRun } from './createPlugins';

const createDeskofyConfig = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  const defaultFileName = 'deskofy.config.json5';

  const jsonFile: Partial<TDeskofyConfigSchema> = {
    environment: 'development',
    name: payload.projectName,
    description: payload.projectDescription,
    author: payload.projectAuthor,
    packageName: payload.packageName,
    version: payload.projectVersion,
    domain: payload.domain,
    ...(payload.isEmpty === false && {
      plugins: [deskofyPluginsToRun.mainPlugin],
      rendererPlugins: [deskofyPluginsToRun.renderedPlugin],
    }),
  };

  await fs.writeFile(
    path.join(payload.directoryToPerform, defaultFileName),
    JSON5.stringify(jsonFile, null, 2),
  );
};

export { createDeskofyConfig };
