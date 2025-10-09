import fs from 'fs-extra';
import path from 'path';

const isFileExists = (fileName: string): boolean => {
  const tsconfigPath = path.join(process.cwd(), fileName);

  if (!fs.existsSync(tsconfigPath)) {
    return false;
  }

  return true;
};

export { isFileExists };
