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
  headScripts: [
    `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "mpsbpz79be");
    `,
    'https://www.googletagmanager.com/gtag/js?id=G-QLL8LBMFJQ',
    `  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-QLL8LBMFJQ');`,
  ],
});
