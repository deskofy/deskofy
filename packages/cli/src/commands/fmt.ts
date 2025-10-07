import { runNpxPrettier } from '../helpers/spawns/npxPrettier';

const fmtCommand = async (): Promise<void> => await runNpxPrettier();

export { fmtCommand };
