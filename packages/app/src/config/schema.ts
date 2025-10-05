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
      additionalProperties: false,
      default: {
        mac: '',
        windows: '',
        linux: '',
      },
    },
    windowStartup: {
      type: 'object',
      properties: {
        shouldShowBeforeLoadingComplete: { type: 'boolean' },
        shouldEnableSplashScreen: { type: 'boolean' },
      },
      additionalProperties: false,
      default: {
        shouldShowBeforeLoadingComplete: true,
        shouldEnableSplashScreen: false,
      },
    },
    windowSize: {
      type: 'object',
      properties: {
        height: { type: 'number' },
        width: { type: 'number' },
        minHeight: { type: 'number' },
        minWidth: { type: 'number' },
      },
      additionalProperties: false,
      default: {
        height: 400,
        width: 600,
        minHeight: 0,
        minWidth: 0,
      },
    },
    windowLayout: {
      type: 'object',
      properties: {
        shouldHideTitleBar: { type: 'boolean' },
        shouldEnableFrame: { type: 'boolean' },
        shouldDisableAutoHideCursor: { type: 'boolean' },
        shouldHaveRoundCorners: { type: 'boolean' },
        shouldEnableShadows: { type: 'boolean' },
      },
      additionalProperties: false,
      default: {
        shouldHideTitleBar: false,
        shouldEnableFrame: true,
        shouldDisableAutoHideCursor: true,
        shouldHaveRoundCorners: true,
        shouldEnableShadows: true,
      },
    },
    windowOptions: {
      type: 'object',
      properties: {
        shouldMovable: { type: 'boolean' },
        shouldMinimizable: { type: 'boolean' },
        shouldMaximizable: { type: 'boolean' },
        shouldClosable: { type: 'boolean' },
        shouldFocusable: { type: 'boolean' },
        shouldFullscreenable: { type: 'boolean' },
        shouldRestoreState: { type: 'boolean' },
      },
      additionalProperties: false,
      default: {
        shouldMovable: true,
        shouldMinimizable: true,
        shouldMaximizable: true,
        shouldClosable: true,
        shouldFocusable: true,
        shouldFullscreenable: true,
        shouldRestoreState: false,
      },
    },
    windowColors: {
      type: 'object',
      properties: {
        dark: { type: 'string' },
        light: { type: 'string' },
      },
      additionalProperties: false,
      default: {
        dark: '#000000',
        light: '#ffffff',
      },
    },
    externalLinks: {
      type: 'object',
      properties: {
        shouldOpenNonAppLinksExternally: { type: 'boolean' },
      },
      additionalProperties: false,
      default: {
        shouldOpenNonAppLinksExternally: true,
      },
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
      additionalProperties: false,
      default: {
        splashScreen: '',
        offline: '',
        httpNotAllowed: '',
      },
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
        shouldOpenDevToolsWhenRun: { type: 'boolean' },
      },
      additionalProperties: false,
      default: {
        shouldOpenDevToolsWhenRun: true,
      },
    },
    highRisk: {
      type: 'object',
      properties: {
        shouldLoadHTTPDomains: { type: 'boolean' },
        shouldEnableWebSecurity: { type: 'boolean' },
        shouldAllowRunningInsecureContent: { type: 'boolean' },
        shouldEnableExperimentalFeatures: { type: 'boolean' },
      },
      additionalProperties: false,
      default: {
        shouldLoadHTTPDomains: false,
        shouldEnableWebSecurity: true,
        shouldAllowRunningInsecureContent: false,
        shouldEnableExperimentalFeatures: false,
      },
    },
  },
  required: ['environment', 'name', 'domain'],
  additionalProperties: false,
};

export type { TDeskofyConfigSchema };

export { CONFIG_SCHEMA };
