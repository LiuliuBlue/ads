import request from '@/utils/request'
/**
 * 验证码接口
 */
export const getCaptcha = () => {
  return request({ url: '/captcha', method: 'GET' })
}
/**
 * 登录接口
 */
export const getLogin = (data) => {
  return request({
    url:
      '/login?username=' +
      data.username +
      '&password=' +
      data.password +
      '&code=' +
      data.code +
      '&token=' +
      data.token,
    method: 'POST',
    data
  })
}
