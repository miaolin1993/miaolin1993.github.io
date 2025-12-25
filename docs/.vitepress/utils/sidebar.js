import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { format } from "date-fns"

// 获取所有文章目录
export function getAllCategories(dir = "docs") {
  const FILTER_LIST = [".vitepress", "public", "components", "only"]
  const categories = fs
    .readdirSync(dir)
    .filter((item) => fs.statSync(path.join(dir, item)).isDirectory())
    .filter((item) => !FILTER_LIST.includes(item))
  return categories
}

export function generateSidebar(dir = "docs") {
  const sidebar = {}
  const allFiles = []

  const categories = getAllCategories(dir)
  categories.forEach((category) => {
    const files = fs
      .readdirSync(path.join(dir, category))
      .filter((file) => file.endsWith(".md") && file !== "index.md")
      .sort()
    const itemLists = files.map((file) => {
      const fileData = readMatter(path.join(dir, category, file))
      allFiles.push(fileData)
      return {
        text: fileData.title,
        link: fileData.link,
      }
    })
    const indexData = readMatter(path.join(dir, category, "index.md"))
    sidebar[indexData.link] = {
      text: indexData.title,
      collapsed: false,
      items: itemLists,
    }
  })
  const articles = allFiles
    .slice(0, 5)
    .sort((a, b) => b.date - a.date)
    .map((item) => ({ ...item, date: formatDate(item.date).toString() }))

  return {
    sidebar,
    articles,
  }
}

// 获取md文件得头部matter信息
function readMatter(filePath) {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.warn(`文件不存在: ${filePath}`)
      return null
    }

    // 读取文件内容
    const content = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(content)
    return data
  } catch (error) {
    console.error(`读取文件失败: ${filePath}`, error)
    return null
  }
}

const formatDate = (date) => format(date, "yyyy-MM-dd HH:mm:ss")
