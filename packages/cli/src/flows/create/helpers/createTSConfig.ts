import * as fs from 'fs/promises';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';

const createTSConfig = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  const fileName = 'tsconfig.json';

  const sourceDirectory = 'src';

  const jsonFile = {
    compilerOptions: {
      module: 'ESNext',
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      target: 'ES2023',
      noImplicitAny: true,
      moduleResolution: 'node',
      sourceMap: false,
      outDir: 'runtime',
      baseUrl: 'src',
      paths: {
        '*': ['*'],
      },
      allowJs: true,
      skipLibCheck: true,
      useUnknownInCatchVariables: true,
      strict: true,
      noEmit: false,
      incremental: true,
      resolveJsonModule: true,
      isolatedModules: true,
    },
    include: ['src/**/*'],
    exclude: ['node_modules', 'bin/**/*', 'dist/**/*', 'export/**/*'],
  };

  await fs.mkdir(path.join(payload.directoryToPerform, sourceDirectory));

  await fs.writeFile(
    path.join(payload.directoryToPerform, fileName),
    JSON.stringify(jsonFile, null, 2),
  );
};

export { createTSConfig };
