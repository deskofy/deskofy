import { printError } from '../utils/printLog';

const returnArchitecture = (architecture: string): string => {
  switch (architecture) {
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
      return 'exe';

    case 'dmg':
      return 'dmg';

    case 'mas':
      return 'mas';

    case 'pkg':
      return 'pkg';

    default:
      printError(`Invalid/unsupported architecture ${architecture} detected`);

      process.exit(1);
  }

  return '';
};

export { returnArchitecture };
