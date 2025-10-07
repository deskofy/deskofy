import { runNpxEslint } from '../helpers/spawns/npxEslint';

const lintCommand = async (): Promise<void> => await runNpxEslint();

export { lintCommand };
