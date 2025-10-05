import * as fs from 'fs/promises';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';

const createPackageJSON = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  const fileName = 'package.json';

  const jsonFile: object = {
    name: payload.packageName,
    version: '0.0.0',
    private: true,
    scripts: {
      'app:setup': 'npx deskofy setup',
      'app:compile': 'npx deskofy compile deskofy.config.json5',
      'app:run': 'npx deskofy run deskofy.config.json5',
      'app:build': 'npx deskofy build',
    },
    devDependencies: {
      '@deskofy/app': 'latest',
    },
  };

  await fs.writeFile(
    path.join(payload.directoryToPerform, fileName),
    JSON.stringify(jsonFile, null, 2),
  );
};

export { createPackageJSON };
