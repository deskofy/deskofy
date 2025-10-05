import * as fs from 'fs/promises';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';

const createTSConfig = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  const fileName = '';

  const jsonFile = {};

  await fs.writeFile(
    path.join(payload.directoryToPerform, fileName),
    JSON.stringify(jsonFile, null, 2),
  );
};

export { createTSConfig };
