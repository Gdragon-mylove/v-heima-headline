// 定义成一个插件
import myBread from '@/components/my-bread' // 导入面包屑组件
import myChannel from '@/components/my-channel' // 导入频道组件
import myImage from '@/components/my-image' // 导入封面组件
export default {
  // 必须要有install函数,传 一个vue对象参数
  install (Vue) {
    // 把components下的组件，注册成一个全局组件

    // 语法是Vue.component('组件名称','组件对象')

    Vue.component(myBread.name, myBread)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
  }
}
