import {
  TDeskofyApp,
  TDeskofyMenu,
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
    deskofyMenu: TDeskofyMenu;
    deskofyNavigation: TDeskofyNavigation;
    deskofyNetwork: TDeskofyNetwork;
    deskofyNotification: TDeskofyNotification;
    deskofyVersion: TDeskofyVersion;
    deskofyWindow: TDeskofyWindow;
  }
}
