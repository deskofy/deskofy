type TDeskofyConfigSchema = {
  environment: string;
  name: string;
  domain: string;
  icons: {
    mac: string | string[];
    windows: string | string[];
    linux: string | string[];
  };
  windowStartup: {
    shouldShowBeforeLoadingComplete: boolean;
    shouldEnableSplashScreen: boolean;
  };
  windowSize: {
    height: number;
    width: number;
    minHeight: number;
    minWidth: number;
  };
  windowLayout: {
    shouldHideTitleBar: boolean;
    shouldEnableFrame: boolean;
    shouldDisableAutoHideCursor: boolean;
    shouldHaveRoundCorners: boolean;
    shouldEnableShadows: boolean;
  };
  windowOptions: {
    shouldMovable: boolean;
    shouldMinimizable: boolean;
    shouldMaximizable: boolean;
    shouldClosable: boolean;
    shouldFocusable: boolean;
    shouldFullscreenable: boolean;
    shouldRestoreState: boolean;
  };
  windowColors: {
    dark: string;
    light: string;
  };
  externalLinks: {
    shouldOpenNonAppLinksExternally: boolean;
  };
  htmlPages: {
    splashScreen: string | string[];
    offline: string | string[];
    httpNotAllowed: string | string[];
  };
  plugins: string[];
  rendererPlugins: string[];
  development: {
    shouldOpenDevToolsWhenRun: boolean;
  };
  highRisk: {
    shouldLoadHTTPDomains: boolean;
    shouldEnableWebSecurity: boolean;
    shouldAllowRunningInsecureContent: boolean;
    shouldEnableExperimentalFeatures: boolean;
  };
};

const CONFIG_SCHEMA = {
  type: 'object',
  properties: {
    environment: { type: 'string' },
    name: { type: 'string' },
    domain: { type: 'string' },
    icons: {
      type: 'object',
      properties: {
        mac: {
          anyOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
          ],
        },
        windows: {
          anyOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
          ],
        },
        linux: {
          anyOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
          ],
        },
      },
      required: ['mac', 'windows', 'linux'],
      additionalProperties: false,
    },
    windowStartup: {
      type: 'object',
      properties: {
        shouldShowBeforeLoadingComplete: { type: 'boolean', default: true },
        shouldEnableSplashScreen: { type: 'boolean', default: false },
      },
      additionalProperties: false,
    },
    windowSize: {
      type: 'object',
      properties: {
        height: { type: 'number' },
        width: { type: 'number' },
        minHeight: { type: 'number', default: 0 },
        minWidth: { type: 'number', default: 0 },
      },
      required: ['height', 'width'],
      additionalProperties: false,
    },
    windowLayout: {
      type: 'object',
      properties: {
        shouldHideTitleBar: { type: 'boolean' },
        shouldEnableFrame: { type: 'boolean', default: true },
        shouldDisableAutoHideCursor: { type: 'boolean' },
        shouldHaveRoundCorners: { type: 'boolean' },
        shouldEnableShadows: { type: 'boolean', default: true },
      },
      required: [
        'shouldHideTitleBar',
        'shouldDisableAutoHideCursor',
        'shouldHaveRoundCorners',
      ],
      additionalProperties: false,
    },
    windowOptions: {
      type: 'object',
      properties: {
        shouldMovable: { type: 'boolean', default: true },
        shouldMinimizable: { type: 'boolean', default: true },
        shouldMaximizable: { type: 'boolean', default: true },
        shouldClosable: { type: 'boolean', default: true },
        shouldFocusable: { type: 'boolean', default: true },
        shouldFullscreenable: { type: 'boolean', default: true },
        shouldRestoreState: { type: 'boolean', default: false },
      },
      additionalProperties: false,
    },
    windowColors: {
      type: 'object',
      properties: {
        dark: { type: 'string' },
        light: { type: 'string' },
      },
      required: ['dark', 'light'],
      additionalProperties: false,
    },
    externalLinks: {
      type: 'object',
      properties: {
        shouldOpenNonAppLinksExternally: { type: 'boolean', default: true },
      },
      additionalProperties: false,
    },
    htmlPages: {
      type: 'object',
      properties: {
        splashScreen: {
          anyOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
          ],
        },
        offline: {
          anyOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
          ],
        },
        httpNotAllowed: {
          anyOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
          ],
        },
      },
      required: ['offline', 'httpNotAllowed'],
      additionalProperties: false,
    },
    plugins: {
      type: 'array',
      items: { type: 'string' },
      default: [],
    },
    rendererPlugins: {
      type: 'array',
      items: { type: 'string' },
      default: [],
    },
    development: {
      type: 'object',
      properties: {
        shouldOpenDevToolsWhenRun: { type: 'boolean', default: true },
      },
      additionalProperties: false,
    },
    highRisk: {
      type: 'object',
      properties: {
        shouldLoadHTTPDomains: { type: 'boolean', default: false },
        shouldEnableWebSecurity: { type: 'boolean', default: true },
        shouldAllowRunningInsecureContent: { type: 'boolean', default: false },
        shouldEnableExperimentalFeatures: { type: 'boolean', default: false },
      },
      additionalProperties: false,
    },
  },
  required: [
    'environment',
    'name',
    'domain',
    'icons',
    'windowSize',
    'windowLayout',
    'windowOptions',
    'windowColors',
    'htmlPages',
    'development',
    'highRisk',
  ],
  additionalProperties: false,
};

export type { TDeskofyConfigSchema };

export { CONFIG_SCHEMA };
