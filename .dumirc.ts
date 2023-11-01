import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs',
  resolve: {
    docDirs: ['pages'],
  },
  themeConfig: {
    name: '妙林小窝',
  },
});
