import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '妙林博客',
  description: 'A VitePress Blog',
  base: '/',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '紫微斗数', link: '/zw/' }
    ],
    
    sidebar: {
      '/blog/': [
        {
          text: '技术',
          items: [
            { text: '第一篇文章', link: '/blog/first-post' },
          ]
        }
      ],
      '/zw/': [
        {
          text: '紫微斗数',
          items: [
            { text: '禄逢冲破', link: '/zw/lfcp' },
            { text: '十二基础盘', link: '/zw/base-pan' }
          ]
        }
      ]
    },
    
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
  }
})

