import fs from 'fs';

const isDirectoryEmpty = (directory: string | undefined): boolean => {
  if (!directory) {
    return false;
  }

  try {
    const stats = fs.statSync(directory);
    if (!stats.isDirectory()) {
      return false;
    }

    const files = fs.readdirSync(directory);
    return files.length === 0;
  } catch {
    return false;
  }
};

export { isDirectoryEmpty };
