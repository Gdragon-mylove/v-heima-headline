// 创建一个router实例，导出给main.js使用

import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home' // 导入home首页组件
import Welcome from '@/views/welcome' // 导入welcome欢迎页面
// import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // name给当前路由取名字
    // 取名字的作用是跳转使用。$router.push('/login')或者$router.push({name:'login})
    // 这2种方法都可以给当前路由命名
    { path: '/login', name: 'login', component: Login },
    // 配置首页路由
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    }
    // { path: '*', name: '404', component: 'NotFound' }
  ]
})

export default router
