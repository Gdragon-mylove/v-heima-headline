<template>
    <div class="record">
        <!-- 这里放卡片element-ui组件 -->
        <el-card class="mycard">
            <!-- logo标志 -->
            <img src="../../assets/images/logo_index.png" alt="">
            <!-- 表单部分 rules绑定添加校验属性-->
            <el-form :model="loginForms" :rules="loginRules" ref="loginForm" status-icon>
                <!-- prop属性为element-ui组件里的固定属性 -->
                <el-form-item prop="mobile">
                    <el-input v-model="loginForms.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForms.code" placeholder="请输入验证码" style="width:238px;margin-right:10px;"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    // 自定义校验规则，通过element-ui组件先定义一个校验函数
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机格式不对'))
      }
      callback()
    }
    return {
      // 返回表单的数据对象
      loginForms: {
        // 字段应该参考接口文档
        mobile: '18782206946', // 手机号
        code: '246810'// 验证码
      },
      loginRules: {
        // 返回表单rules属性绑定的数据
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 调用自定义校验函数
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  // 对整个表单进行校验
  // 1. 给表单组件加ref属性   ref="loginForm"
  // 2. 获取组件实例（dom对象）
  // 3. 调用校验函数
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
        //   console.log(this.loginForms)

          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForms)
            .then(res => {
              // 登录成功就挑战到路由为'/'页面中
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('错了哦，这是一条错误消息')
            })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
 .record {
     width: 100%;
     height: 100%;
     position: absolute;
     left: 0;
     top: 0;
     background:url(../../assets/images/login_bg.jpg) no-repeat center / cover;
     .mycard {
         width: 400px;
         height: 350px;
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%,-50%);
         img {
             display: block;
             width: 200px;
             margin: 0 auto 30px;

         }
     }
 }
</style>
