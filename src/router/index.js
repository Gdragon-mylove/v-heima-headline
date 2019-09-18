// 创建一个router实例，导出给main.js使用

import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home' // 导入home首页组件
import Welcome from '@/views/welcome' // 导入welcome欢迎页面
import NotFound from '@/views/404'
import store from '@/store'
import Article from '@/views/article'
import Image from '@/views/images'
import Comment from '@/views/comment'
import Publish from '@/views/publish'

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
        { path: '/', name: 'welcome', component: Welcome },
        // 配置内容管理路由
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/comment', name: 'comment', component: Comment },
        { path: '/publish', name: 'publish', component: Publish }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 通过设置前置守卫来实现访问权限控制
router.beforeEach((to, from, next) => {
  // 获取用户的信息
  const user = store.getUser()

  // 判断用户是否通过登录页面跳转到其他页面的

  // 访问的是登录页面 就放行执行next()
  if (to.path === '/login') return next()

  // 如不是通过登录页面访问的其他页面的话，就拦截到登录页面，再放行执行next()
  if (!user.token) return next('/login')
  next()
})

export default router
