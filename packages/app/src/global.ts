const APP_ENVS = {
  VERSION: '1.0.0',
};

const CONFIG_ENVS = {
  CONFIG: process.env.DESKOFY_APP_CONFIG ?? 'deskofy.config.json5',
};

export { APP_ENVS, CONFIG_ENVS };
