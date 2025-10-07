const esbuild = require('esbuild');
const path = require('path');

esbuild
  .build({
    entryPoints: [path.resolve(__dirname, 'src/preload.ts')],
    bundle: true,
    platform: 'node',
    target: ['ES2023'],
    outfile: path.resolve(__dirname, 'dist/preload.js'),
    sourcemap: true,
    external: [
      'electron',
      'fs',
      'path',
      'os',
      'crypto',
      'stream',
      'util',
      'assert',
    ],
  })
  .then(() => console.log('Preload bundled successfully!'))
  .catch((err) => {
    console.error('Preload bundling failed:', err);
    process.exit(1);
  });
