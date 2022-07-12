import { login, userInfo, MenuNav, logout } from '@/api/user'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { TOKEN } from '@/utils/const'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {},
    menus: [],
    authoritys: []
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setNav(state, nav) {
      state.menus = nav.menus
      state.authoritys = nav.authoritys
    }
  },
  actions: {
    async login({ commit }, data) {
      const res = await login(data)
      commit('setToken', res)
    },
    async userInfo({ commit }) {
      const res = await userInfo()
      commit('setUserInfo', res)
    },
    async userNav({ commit }) {
      const res = await MenuNav()
      commit('setNav', res)
      return res
    },
    async userLogout({ commit }) {
      await logout()
      commit('setToken', '')
      removeItem(TOKEN)
    }
  }
}
