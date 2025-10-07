import fs from 'fs-extra';
import path from 'path';

import { printError } from '../../../utils/printLog';

const copyPackageJSON = async (
  runningDir: string,
  appDir: string,
): Promise<void> => {
  const source = path.join(runningDir, 'package.json');
  const destination = path.join(appDir, 'package.json');

  try {
    await fs.copyFile(source, destination, 0);
  } catch (err) {
    printError('Unable to copy package.json:', err);
    throw err;
  }
};

export { copyPackageJSON };
