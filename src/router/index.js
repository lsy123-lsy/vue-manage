import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import('../page/login.vue')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
