import fs from 'fs-extra';
import path from 'path';

const isFileExists = (fileName: string): boolean => {
  try {
    const filePath = path.join(process.cwd(), fileName);

    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      return true;
    }
  } catch {
    // Just ignore...
  }

  return true;
};

export { isFileExists };
