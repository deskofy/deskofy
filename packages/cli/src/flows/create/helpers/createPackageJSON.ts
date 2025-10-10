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
    engines: {
      node: '>=22.18.0',
    },
    scripts: {
      start: 'npx deskofy run',
      build: 'npx deskofy build',
    },
    dependencies: {
      '@deskofy/app': 'latest',
      '@deskofy/config': 'latest',
      'cross-env': '10.0.0',
      json5: '2.2.3',
      esbuild: '0.25.10',
      'fs-extra': '11.3.2',
    },
    devDependencies: {
      ...(payload.isEmpty === false && {
        eslint: '9.37.0',
        prettier: '3.6.2',
        typescript: '5.9.3',
        '@types/node': '24.7.0',
        electron: '38.1.1',
      }),
    },
  };

  await fs.writeFile(
    path.join(payload.directoryToPerform, fileName),
    JSON.stringify(jsonFile, null, 2),
  );
};

export { createPackageJSON };
