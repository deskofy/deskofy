import * as fs from 'fs/promises';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';

const createDeskofyConfig = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  const fileName = 'deskofy.config.json5';

  const jsonFile = {
    environment: 'development',
    name: payload.projectName,
    domain: payload.domain,
  };

  await fs.writeFile(
    path.join(payload.directoryToPerform, fileName),
    JSON.stringify(jsonFile, null, 2),
  );
};

export { createDeskofyConfig };
