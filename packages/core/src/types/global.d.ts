import {
  TDeskofyApp,
  TDeskofyNavigation,
  TDeskofyNetwork,
  TDeskofyNotification,
  TDeskofyPlugins,
  TDeskofyVersion,
  TDeskofyWindow,
} from '../ipc';

declare global {
  interface Window {
    deskofy?: {
      plugins?: TDeskofyPlugins;
    };
    deskofyApp: TDeskofyApp;
    deskofyNavigation: TDeskofyNavigation;
    deskofyNetwork: TDeskofyNetwork;
    deskofyNotification: TDeskofyNotification;
    deskofyVersion: TDeskofyVersion;
    deskofyWindow: TDeskofyWindow;
  }
}
