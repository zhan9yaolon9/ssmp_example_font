import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import axios from 'axios'
//设置反向代理，前端请求默认发送到http://localhost:8081/api
axios.defaults.baseURL = 'http://localhost:8080/api'
//全局注册，之后可用this.$axios发送数据
Vue.prototype.$axios = axios

Vue.config.productionTip = false

/**
 * router.beforeEach()注册一个全局前置路由守卫
 * to 即将要进入的目标路由对象
 * from 当前导航正要离开的路由对象
 * next 确保调用next方法，否则狗子就不会被resolve（识别？）
 */
router.beforeEach((to,form, next) => {
  if(to.meta.requireAuth){  /**查看目标路由对象的requireAuth的值是否为true，即要被拦截 */
    if(store.state.user.username){  /**查看本地存储中username登录信息是否为空 */
      next()
    }else{  /**未登录就返回到登录界面 */
      next({
        path:'login',
        query:{redirect: to.fullPath}
      })
    }
  }else{
    next()
  }
})

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

