// 定义成一个插件
import myBread from '@/components/my-bread.vue' // 导入面包屑组件
export default {
  // 必须要有install函数,传 一个vue对象参数
  install (Vue) {
    // 把components下的组件，注册成一个全局组件

    // 语法是Vue.component('组件名称','组件对象')

    Vue.component(myBread.name, myBread)
  }
}
