import { runNpxTscTypes } from '../helpers/spawns/npxTscTypes';

const typesCommand = async (): Promise<void> => await runNpxTscTypes();

export { typesCommand };
