// 创建一个router实例，导出给main.js使用

import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // name给当前路由取名字
    // 取名字的作用是跳转使用。$router.push('/login')或者$router.push({name:'login})
    // 这2种方法都可以给当前路由命名
    { path: '/login', name: 'login', component: Login }
  ]
})

export default router
