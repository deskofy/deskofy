import 'react';

declare module 'react' {
  interface CSSProperties {
    WebkitAppRegion?: 'drag' | 'no-drag';
    WebkitUserSelect?: string;
  }
}

declare module '*.css';
declare module '*.scss';
