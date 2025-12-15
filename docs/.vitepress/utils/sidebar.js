import fs from 'fs'
import path from 'path'

export function generateSidebar(dir = 'docs') {
  const sidebar = {}
  const FILTER_LIST = ['.vitepress', 'public', 'components']
  
  // 获取所有目录
  const categories = fs.readdirSync(dir).filter(item => 
    fs.statSync(path.join(dir, item)).isDirectory()
  ).filter(item => !FILTER_LIST.includes(item))

  categories.forEach(category => {
    const sidebarText = readFirstH1(path.join(dir, category, 'index.md'))
    const files = fs.readdirSync(path.join(dir, category))
      .filter(file => file.endsWith('.md') && file !== 'index.md')
      .sort()
    const categoryPath = `/${category}/`
    sidebar[categoryPath] = [
      {
        text: sidebarText,
        collapsed: false,
        items: files.map(file => ({
          text: readFirstH1(path.join(dir, category, file)),
          link: `/${category}/${file.replace('.md', '')}`
        }))
      }
    ]
  })
  return sidebar
}

// 读取index.md的首个一级标题，用于生成侧边栏的分类
function readFirstH1(filePath) {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.warn(`文件不存在: ${filePath}`)
      return null
    }
    
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // 正则表达式匹配第一个 # 标题
    const match = content.match(/^#\s+(.+)$/m)
    if (match) return match[1].trim()
    return null
  } catch (error) {
    console.error(`读取文件标题失败: ${filePath}`, error)
    return null
  }
}