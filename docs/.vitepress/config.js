import { defineConfig } from 'vitepress'
import { navConfig } from './configs/navConfig'
import { generateSidebar } from './utils/sidebar'

export default defineConfig({
  title: '妙林博客',
  description: 'A VitePress Blog',
  base: '/',

  themeConfig: {
    nav: navConfig,

    sidebar: generateSidebar(),
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025'
    },
    
    search: {
      provider: 'local'
    }
  },
  vite: {
    plugins: [
      {
        name: 'redirect-plugin',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/components/twelve/' || req.url === '/components/twelve') {
              res.writeHead(301, { 
                Location: '/zw/base-pan.html',
                'Cache-Control': 'no-cache'
              });
              res.end();
              return;
            }
            next();
          });
        }
      }
    ]
  }
})

