import * as fs from 'fs/promises';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';

const createPrettierConfig = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  const fileName = '.prettierrc';

  const jsonFile = {
    arrowParens: 'always',
    bracketSameLine: false,
    bracketSpacing: true,
    printWidth: 80,
    quoteProps: 'as-needed',
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
  };

  await fs.writeFile(
    path.join(payload.directoryToPerform, fileName),
    JSON.stringify(jsonFile, null, 2),
  );
};

export { createPrettierConfig };
