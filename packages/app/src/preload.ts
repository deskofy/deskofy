import { contextBridge } from 'electron';

import { APP_ENVS } from './global';
import { exposeIpcContexts } from './ipc/expose';
import { customRendererPlugins } from './plugins/renderer';

// Custom IPCs

contextBridge.exposeInMainWorld('deskofy', {
  version: APP_ENVS.VERSION,
  plugins: customRendererPlugins,
});

// Built-in IPCs

exposeIpcContexts();
