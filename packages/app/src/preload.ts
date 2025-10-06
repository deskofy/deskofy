import { contextBridge } from 'electron';

import { exposeIpcContexts } from './ipc/expose';
import { customRendererPlugins } from './plugins/renderer';

// Custom IPCs

contextBridge.exposeInMainWorld('deskofy', {
  plugins: customRendererPlugins,
});

// Built-in IPCs

exposeIpcContexts();
