import os from 'os';

import { printError } from '../utils/printLog';

const supportedBuildPlatforms = ['linux', 'windows', 'mac'] as const;

type TSupportedBuildPlatforms = (typeof supportedBuildPlatforms)[number];

const supportedBuildTargets: Record<TSupportedBuildPlatforms, string[]> = {
  linux: ['deb', 'rpm', 'app-image', 'flatpak', 'snap'],
  windows: ['msi', 'msi-wrapped', 'exe'],
  mac: ['dmg'],
};

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

const returnArchitecture = (target: string): string => {
  switch (target) {
    case 'deb':
      return 'deb';

    case 'rpm':
      return 'rpm';

    case 'app-image':
      return 'AppImage';

    case 'flatpak':
      return 'flatpak';

    case 'snap':
      return 'snap';

    case 'nsis':
      return 'nsis';

    case 'app-x':
      return 'appx';

    case 'msi':
      return 'msi';

    case 'msi-wrapped':
      return 'msi-wrapped';

    case 'exe':
      // electron-build does not support `exe`
      // directly

      return 'portable';

    case 'dmg':
      return 'dmg';

    case 'mas':
      return 'mas';

    case 'pkg':
      return 'pkg';

    default:
      printError(`Invalid/unsupported architecture ${target} detected`);
      process.exit(1);
  }

  return '';
};

export type { TSupportedBuildPlatforms };

export {
  supportedBuildPlatforms,
  supportedBuildTargets,
  returnPlatform,
  returnArchitecture,
};
