// 全局路径工具 - 处理 GitHub Pages 部署路径
export const BASE_URL = import.meta.env.BASE_URL

// 获取图片的完整路径（用于 public/images/ 下的资源）
export function img(path) {
  return BASE_URL + path.replace(/^\//, '')
}
