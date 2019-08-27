<template>
    <el-container class="home-container">
        <el-aside :width="isCollapse?'64px':'200px'">
            <div class="logo" :class="{miniLogo:isCollapse}"></div>
            <el-menu
            default-active="/"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            >
                <el-menu-item index="/">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/article">
                    <i class="el-icon-document"></i>
                    <span slot="title">内容管理</span>
                </el-menu-item>
                <el-menu-item index="image">
                    <i class="el-icon-picture"></i>
                    <span slot="title">素材管理</span>
                </el-menu-item>
                <el-menu-item index="publish">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
                <el-menu-item index="comment">
                    <i class="el-icon-chat-dot-round"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="fans">
                    <i class="el-icon-present"></i>
                    <span slot="title">粉丝管理</span>
                </el-menu-item>
                <el-menu-item index="setting">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <span @click="toggleMenu()" class="icon el-icon-s-fold"></span>
                <span class="text">江苏传智播客科技教育有限公司</span>
                <el-dropdown class="my-dropdown">
                    <span class="el-dropdown-link">
                        <img class="avatar" :src="photo" alt="">
                        <span class="username">{{name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock" @click.native="loginout()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <!-- 二级路由对应组件渲染位置 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import store from '@/store'// 导入store文件
export default {
  data () {
    return {
      isCollapse: false,
      photo: '',
      name: ''
    }
  },
  created () {
    // 首先获取用户信息
    const user = store.getUser()
    this.photo = user.photo// 当前的用户输入的头像
    this.name = user.name// 当前用户输入的用户名称
  },
  methods: {
    toggleMenu () {
      // 切换侧边栏展开与收起
      // 数据isCollapse 默认值为false 是展开的意思
      // 通过这个数据的状态去切换 侧边栏展开与收起的状态
      this.isCollapse = !this.isCollapse
    },
    // 因为el-dropdown-item 组件事件绑定，不支持click
    // 因此在给组件绑定事件的时候，如果组件不支持这个事件，也就不会触发
    // click是原生DOM绑定的事件。因此就需要事件修饰符来阻止默认行为。@click.native="函数"

    // 点击个人设置去到设置页面，提供一个函数
    setting () {
      // 点击触发跳转到路由为‘/setting’ 的页面
      this.$router.push('/setting')
    },
    // 点击退出登录，提供一个函数
    loginout () {
      // 首先应该清除存储的用户登录信息
      store.delUser()
      // 然后退出登录，跳转到登录‘/login’ 页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='less' scoped>
    .home-container {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        .el-aside {
            background: #002033;
            .logo {
                width: 100%;
                height: 60px;
                background: #002244 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
            }
            .miniLogo {
                background-image: url(../../assets/images/logo_admin_01.png);
                background-size: 36px auto;
            }
            .el-menu-vertical-demo {
                border-right: none;
            }
        }
        .el-header {
            border-bottom: 1px solid #ddd;
            line-height: 60px;
            .icon {
                font-size: 24px;
                vertical-align: middle;
                padding-right: 10px;
            }
            .text {
                vertical-align: middle;
            }
            .my-dropdown {
                float: right;
                .avatar {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                }
                .username {
                    font-weight: bold;
                    color: #333;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
