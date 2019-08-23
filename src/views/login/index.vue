<template>
    <div class="record">
        <!-- 这里放卡片element-ui组件 -->
        <el-card class="mycard">
            <!-- logo标志 -->
            <img src="../../assets/images/logo_index.png" alt="">
            <!-- 表单部分 -->
            <el-form :model="loginForm">
                <el-form-item>
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:238px;margin-right:10px;"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 返回表单的数据对象
      loginForm: {
        // 字段应该参考接口文档
        mobile: '', // 手机号
        code: ''// 验证码
      }
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
