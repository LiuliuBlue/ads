import request from '@/utils/request'

/**
 * 获取角色列表API
 * @param data
 * @returns {AxiosPromise}
 */
export const roleListAPI = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}
/**
 * 添加角色
 */
export const roleAddApi = (data) => {
  return request({
    url: '/role/add',
    method: 'POST',
    data
  })
}
