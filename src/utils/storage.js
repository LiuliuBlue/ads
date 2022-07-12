// 存储犯法
const storage = window.sessionStorage

// 存储数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  storage.setItem(key, value)
}
// 获取数据
export const getItem = (key) => {
  const data = storage.getItem(key)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}
// 删除数据
export const removeItem = (key) => {
  storage.removeItem(key)
}
export const removeAll = () => {
  storage.clear()
}
