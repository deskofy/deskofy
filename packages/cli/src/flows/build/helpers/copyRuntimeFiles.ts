import fs from 'fs-extra';
import path from 'path';

const copyRuntimeFiles = async (
  directory: string,
  filesToCopy: string[] | null,
  directoriesToCopy: string[] | null,
): Promise<void> => {
  const runtimeDir = path.join(directory, 'runtime');

  if (await fs.pathExists(runtimeDir)) {
    await fs.remove(runtimeDir);
  }

  await fs.mkdir(runtimeDir, { recursive: true });

  if (filesToCopy && filesToCopy.length > 0) {
    for (const filePath of filesToCopy) {
      const fileName = path.basename(filePath);
      await fs.copy(filePath, path.join(runtimeDir, fileName));
    }
  }

  if (directoriesToCopy && directoriesToCopy.length > 0) {
    for (const dirPath of directoriesToCopy) {
      const dirName = path.basename(dirPath);
      await fs.copy(dirPath, path.join(runtimeDir, dirName));
    }
  }
};

export { copyRuntimeFiles };
