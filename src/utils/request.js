import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 3 * 1000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 发送请求头
    store.commit('loading/open')
    NProgress.start()
    const token = store.getters.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    store.commit('loading/close')
    NProgress.done()
    return Promise.reject(new Error(error))
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // TODO 全局响应处理
    store.commit('loading/close')
    NProgress.done()
    const { data, code, msg } = response.data
    if (code === 200) {
      return data
    }
    _showErrorMsg(msg)
    return Promise.reject(new Error(msg))
  },
  (error) => {
    store.commit('loading/close')
    NProgress.done()
    const { message } = error
    if (message.includes('timeout')) {
      _showErrorMsg('网络超时')
    }
    if (message.includes('Network Error')) {
      _showErrorMsg('请检查网络')
    }
    const { code, msg, status } = error.response.data
    switch (code) {
      case 400:
        _showErrorMsg(msg)
        break
    }
    if (status === 404) {
      _showErrorMsg('找不到资源啦')
    }
    return Promise.reject(new Error(error))
  }
)

const _showErrorMsg = (msg) => {
  Message.error(msg)
}

// 统一传参处理
const request = (options) => {
  options.params = options.method.toLowerCase() === 'get' ? options.data : {}
  return instance(options)
}

export default request
