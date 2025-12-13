import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Blog',
  description: 'A VitePress Blog',
  base: '/',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' }
    ],
    
    sidebar: {
      '/blog/': [
        {
          text: '文章',
          items: [
            { text: '第一篇文章', link: '/blog/first-post' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024'
    },
    
    search: {
      provider: 'local'
    }
  }
})

