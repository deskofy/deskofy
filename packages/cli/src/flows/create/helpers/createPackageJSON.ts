import * as fs from 'fs/promises';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';

const createPackageJSON = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  const fileName = 'package.json';

  const jsonFile: object = {
    name: payload.packageName,
    description: payload.projectDescription,
    author: payload.projectAuthor,
    version: payload.projectVersion,
    private: true,
    scripts: {
      'app:setup': 'npx deskofy setup',
      'app:run': 'npx deskofy run',
      'app:build': 'npx deskofy build',
    },
    dependencies: {
      '@deskofy/app': 'latest',
      '@deskofy/config': 'latest',
    },
    devDependencies: {
      ...(payload.isEmpty === false && {
        eslint: '9.37.0',
        prettier: '3.6.2',
        typescript: '5.9.3',
      }),
    },
  };

  await fs.writeFile(
    path.join(payload.directoryToPerform, fileName),
    JSON.stringify(jsonFile, null, 2),
  );
};

export { createPackageJSON };
