<template>
  <div class="container">
    <div class="btn-img" @click="openDialog">
      <!-- 如果没有父组件传递的值就显示默认图片 -->
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 点击出现的对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选按钮组 -->
          <el-radio-group v-model="reParams.collect" @change="changeButton" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 素材图片列表 -->
          <div class="iamge-list">
            <div
              class="ex-image"
              :class="{selected:item.url===selectedImageurl}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页部分 -->
          <el-pagination
            background
            hide-on-single-page
            @current-change="changePage"
            :current-page="reParams.page"
            :page-size="reParams.per_page"
            layout=" prev, pager, next"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <!-- 上传图片部分 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            name="image"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess">
            <img v-if="upimageUrl" :src="upimageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  // 接收父组件给传递的值
  props: ['value'],
  data () {
    return {
      // 隐藏对话框默认false
      dialogVisible: false,
      // 选项卡name属性的值，选中某一个选项卡，只需要选中的值等于name属性的值即可
      activeName: 'image',
      // 素材列表请求参数对象
      reParams: {
        // false表示添加收藏，true取消收藏
        collect: false,
        page: 1,
        per_page: 8
      },
      // 素材列表数据
      images: [],
      // 素材总图片数
      total: 0,
      // 声明一个记录点击素材图片的唯一标识，也就是图片地址
      selectedImageurl: null,
      // 声明上传成功后的预览图地址
      upimageUrl: null,
      // 上传图片的请求头配置
      headers: {
        Authorization: 'Bearer ' + store.getUser().token
      },
      // 声明一个确认后的图片地址
      defaultImage
    }
  },
  methods: {
    // 选中素材图片
    selectedImage (url) {
      // 在遍历图片的时候，对比记录的url
      // 如果一致就选中图片，不一致就不选中
      this.selectedImageurl = url
    },
    // 发送请求获取图片返回数据
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reParams })
      // 赋值给素材列表
      this.images = data.results
      // 赋值给总图片数
      this.total = data.total_count
    },
    // 切换全部和收藏按钮
    changeButton () {
      this.reParams.page = 1
      this.getImages()
    },
    // 改变当前分页
    changePage (newPage) {
      this.reParams.page = newPage
      this.getImages()
    },
    // 上传图片成功的钩子函数
    handleSuccess (res) {
      // 提示上传成功
      this.$message.success('上传图片成功')
      // 预览图片赋值
      this.upimageUrl = res.data.url
    },
    // 点击确认图片
    confirmImage () {
      // 校验是否选中素材图片或者是否上传了图片
      // 判断用户选的tab是哪个
      // 定义一个url值为null
      let url = null
      if (this.activeName === 'image') {
        if (!this.selectedImageurl) return this.$message.info('请选中一张图片')
        url = this.selectedImageurl
      } else {
        if (!this.upimageUrl) return this.$message.info('请上传一张图片')
        url = this.upimageUrl
      }
      // 要使用url，给confirmSrc赋值
      // this.confirmSrc = url

      // 把用户确认的图片提交给父组件,就会触发props
      this.$emit('input', url)

      // 确认图片后关闭对话框
      this.dialogVisible = false
    },

    openDialog () {
      // 点击触发事件，显示对话框
      this.dialogVisible = true
      // 如果再次打开对话框应该清除上传的预览图片
      this.upimageUrl = null
      // 还要回到当前选中的选项卡name为‘image’
      this.activeName = 'image'
      // 还要清除素材库被选中的素材图片
      this.selectedImageurl = null
      // 获取素材列表数据
      this.getImages()
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  display: inline-block;
  margin-right:20px;
}
.btn-img {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.iamge-list {
  margin-top: 20px;
  .ex-image {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    // 给图片遍历中加一个类selected伪元素选择器
    &.selected {
      // .img_item.selected::after{} 解析后选择器
      &::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center / 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      // 新属性：图片在容器内的平铺方式
      object-fit: contain;
    }
  }
}
.dialog-footer {
  width: 100%;
  display: block;
  text-align: center;
}
</style>
