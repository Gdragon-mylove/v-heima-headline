// 封装模块用户信息，以便于需要的地方调用
// 通过命名一个key来获取用户的信息

// 命名一个key关键字
const key = 'v-pro-heimma'

// 通过导出函数
export default {
  // 提供储存信息的函数方法，储存用户信息
  setUser (user) {
    // 把用户的信息储存到sessionStorage本地中
    // 因为后台返回的数据为对象格式，需要转换成字符串格式储存
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(key, jsonStr)
  },
  // 提供获取信息的函数
  getUser () {
    // 获取用户信息
    const jsonStr = window.sessionStorage.getItem(key) || '{}'
    // 将获取到的信息返回转换成对象
    return JSON.parse(jsonStr)
  },
  // 提供删除信息的函数
  delUser () {
    // 删除用户信息
    window.sessionStorage.removeItem(key)
  }
}
