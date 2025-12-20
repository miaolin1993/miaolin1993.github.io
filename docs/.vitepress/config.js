import { defineConfig } from 'vitepress'
import { navConfig } from './configs/navConfig'
import { generateSidebar } from './utils/sidebar'

const { sidebar, articles } = generateSidebar()

export default defineConfig({
  title: '妙林博客',
  description: 'A VitePress Blog',
  base: '/',

  themeConfig: {
    nav: navConfig,

    sidebar,
    
    articles,
    
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
})

