import * as fs from 'fs/promises';
import path from 'path';

import { TProjectCreatePayload } from '../createCleanProject';

const createGitIgnore = async (
  payload: TProjectCreatePayload,
): Promise<void> => {
  const fileName = '.gitignore';

  const fileContent = `# Directories

runtime/
bin/
node_modules/

# Files

*.DS_Store
*.tsbuildinfo
`;

  await fs.writeFile(
    path.join(payload.directoryToPerform, fileName),
    fileContent,
  );
};

export { createGitIgnore };
