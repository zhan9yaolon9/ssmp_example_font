import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      /**localStorage是一个本地存储，项目打开时会检查本地存储中username是否为空 */
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '')).username
    }
  },
  getters: {
  },
  mutations: {
    login(state,user){
      state.user = user
      /** window.localStorage存储一个k/v对象 */
      window,localStorage.setItem('user', JSON.stringify(user)) 
    }
  },
  actions: {
  },
  modules: {
  }
})
