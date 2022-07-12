import axios from 'axios'
/**
import store from '../store'
import router from '../router'
 */

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 将token通过请求头发送给后台
    /**
      const token = store.getters.token;
      if (token) config.headers.Authorization = token;
    */
    return config
  },
  (error) => {
    _showError('请求超时')
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data.data
    }
    _showError(response.data.code, response.data.message)
    /**
    if (response.headers.authorization) {
      store.commit("user/SET_TOKEN", response.headers.authorization);
    }
    if (response.data.code === 401) {
      store.commit("SET_TOKEN", "");
      store.commit("SET_USER_INFO", "");
      store.commit("SET_NAV", "");
      router.push("/login");
    }
    */
  },
  (error) => {
    _showError(error.message)
    return Promise.reject(error)
  }
)

// 响应提示信息
const _showError = (message) => {
  const info = message || '发生未知错误'
  this.$message.error(info)
}

// 统一了传参处理
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}

// 导出axios实例对象
export default request
