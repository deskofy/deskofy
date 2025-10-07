import os from 'os';

import { printError } from '../utils/printLog';

const returnPlatform = (): string => {
  const platform = os.platform();

  switch (platform) {
    case 'darwin':
      return 'mac';

    case 'linux':
      return 'linux';

    case 'win32':
      return 'windows';

    default:
      printError(
        `Invalid/unsupported operating system platform ${platform} detected`,
      );

      process.exit(1);
  }

  return '';
};

export { returnPlatform };
