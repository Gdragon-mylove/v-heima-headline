import Vue from 'vue'
import App from './App.vue'

import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// @是src的绝对路径，在vue-cli项目中在可以使用,index.js可以省略
// 目录的默认索引文件，也就是index文件，.js .vue .json 优先级按照现在的顺序
import router from '@/router/index.js'

// 简单配置axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(Elementui)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')