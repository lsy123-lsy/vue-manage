import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import('../page/login.vue')
const manage = () => import('../page/manage.vue')
const home = () => import('../page/home.vue')
const userList = () => import('../page/dataManage/userList.vue')
const shopList = () => import('../page/dataManage/shopList.vue')
const orderList = () => import('../page/dataManage/orderList.vue')
const foodList = () => import('../page/dataManage/foodList.vue')
const adminList = () => import('../page/dataManage/adminList.vue')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      children:[
        {
          path:'',
          component:home,
          meta:[]
        },
        {
          path:'/userList',
          component:userList,
          meta:['数据管理','用户列表'],
        },
        {
          path:'/shopList',
          component:shopList,
          meta:['数据管理','商铺列表'],
        },
        {
          path:'/orderList',
          component:orderList,
          meta:['数据管理','订单列表'],
        },
        {
          path:'/foodList',
          component: foodList,
          meta:['数据管理','食品列表'],
        },
        {
          path:'/adminList',
          component: adminList,
          meta:['数据管理','管理员列表'],
        }
      ]
    }
  ]
})
