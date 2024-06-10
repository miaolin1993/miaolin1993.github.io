import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs',
  // base: '.',
  runtimePublicPath: {},
  resolve: {
    docDirs: ['pages'],
  },
  themeConfig: {
    name: '妙林小窝',
    // publicPath
  },
});
