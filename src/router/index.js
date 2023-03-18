import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../components/Home'
//导入页面组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'

import AddBook from '@/components/home/addBook'

import Test from '@/components/home/test'

import api_test from '@/components/home/api_test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // home页面并不需要被访问
    redirect: '/index',
    children: [
      {
        //首页
        path: '/',
        name: 'AppIndex',
        redirect:'/index',
        component: AppIndex,
        meta:{
          requireAuth:true
        }
      }
    ]
  },
  { 
    //登录页面
    path: '/login',
    name: 'Login',
    component: Login
  },
  { 
    //添加图书页面
    path: '/addBook',
    name: 'addBook',
    component: AddBook
  },
  {
    path:'/test',
    name: 'test',
    component: Test
  },
  {
    path:'/api_test',
    name:'api_test',
    component: api_test
  }
]

const router = new VueRouter({
  mode: 'history',  //历史模式
  base: process.env.BASE_URL,
  routes
})

export default router
