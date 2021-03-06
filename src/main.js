import Vue from 'vue'
import App from './App.vue'
import Upload from './styles/index.css'

import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// @是src的绝对路径，在vue-cli项目中在可以使用,index.js可以省略
// 目录的默认索引文件，也就是index文件，.js .vue .json 优先级按照现在的顺序
import router from '@/router/index.js'

// 简单配置axios
import axios from '@/api'

// 导入全局插件
import myPlugin from '@/components'
Vue.use(Upload) // 使用组件公共样式
Vue.use(myPlugin) // 使用插件
Vue.prototype.$http = axios

Vue.use(Elementui)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
