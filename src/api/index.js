import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 配置全局默认基准地址，baseURL为基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 默认配置，请求头携带token
// Headers是一个对象
// Authorization 是参数字段
// 字段的值语法为：“Bearer” + token
// axios.defaults.headers.Authorization = 'Bearer' + store.getUser().token
// Vue.prototype.$http = axios

// 添加请求拦截器（在每次请求的头部加上token）
// 在每次发送请求之前，执行拦截器
axios.interceptors.request.use((config) => {
  // 拦截成功就在请求头加入token
  config.headers.Authorization = 'Bearer' + store.getUser().token
  return config
}, (err) => {
  // 拦截失败就报出错误
  return Promise.reject(err)
})

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  return response
}, (err) => {
  // 在每次响应失败的时候判断token是否失效
  if (err.response.status === 401) { // 获取状态码
    // token过期或者失效了，就要清楚储存的token
    store.delUser()

    // 然后重新进行登录,通过路由返回到登录页面
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios