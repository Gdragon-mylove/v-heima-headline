<template>
    <div class="img_container">
        <el-card>
            <div slot="header">
                <my-bread>素材管理</my-bread>
            </div>
            <!-- 按钮部分 -->
            <div class="btn_box">
                <el-radio-group v-model="reParams.collect" size="small" @change="changeCollect">
                    <el-radio-button :label="false">全部</el-radio-button>
                    <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
                <el-button style="float:right" type="success" size="small"  @click="openDialog()">添加素材</el-button>
            <el-dialog title="添加素材" :visible.sync="dialogFormVisible" width="300px">
                <el-upload
                    class="avatar-uploader"
                    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                    name="image"
                    :headers="headers"
                    :show-file-list="false"
                    :on-success="handleSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            </div>
            <!-- 用户图片列表 -->
            <div class="image_list">
                <div class="image_item" v-for="item in images" :key="item.id">
                    <img :src="item.url">
                    <div class="image_btn">
                        <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="collectImages (item)"></span>
                        <span class="el-icon-delete" @click="delImages(item.id)"></span>
                    </div>
                </div>
            </div>
            <!-- 分页部分 -->
            <!-- 当分页小于2页时，就隐藏分页组件 就需要加上'hide-on-single-page' 属性 -->
            <el-pagination
            style="text-align:center"
            background
            layout="prev, pager, next"
            :page-size="reParams.per_page"
            :current-page="reParams.page"
            @current-change="changePage"
            hide-on-single-page
            :total="total">
            </el-pagination>
            <!-- 弹出对话表单框部分 -->

        </el-card>
    </div>
</template>

<script>
import store from '../../store'
export default {
  data () {
    return {
      reParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 声明用户图片素材数据
      images: [],

      // 声明页码总条数
      total: 0,
      // 控制点击按钮时对话框的显示与隐藏
      dialogFormVisible: false,

      // 声明预览图片路径
      imageUrl: null,

      // 上传图片的请求头配置
      headers: {
        Authorization: 'Bearer ' + store.getUser().token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 发送获取用户图片素材请求+

    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 实现分页功能
    changePage (newPage) {
      this.reParams.page = newPage
      this.getImages()
    },
    // 实现“全部”和“收藏”按钮的切换
    changeCollect () {
      // 组件中固定的change点击事件
      // 当change事件触发时，将页码设置为第一页
      this.reParams.page = 1
      this.getImages()
    },
    // 实现收藏素材图片功能
    async collectImages (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏')
      item.is_collected = data.collect
    },
    // 实现删除图片素材功能
    delImages (id) {
      // 需要作出提示
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        // 如果请求删除成功就提示用户删除素材成功
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {
        this.$message.info('删除失败')
      })
    },
    // 实现添加素材功能,单击打开对话框
    openDialog () {
      // 上传素材后再打开对话框
      this.dialogFormVisible = true
      // 将预览的图片清空
      this.imageUrl = null
    },
    // 上传成功的钩子函数定义
    handleSuccess (res) {
      // 当用户上传的图片上去先预览并且提示用户上传成功
      this.$message.success('上传成功')
      // res为请求后台的响应主体，预览地址为res.data.url
      this.imageUrl = res.data.url
      // 上传2s后关闭对话框，使用定时器
      window.setTimeout(() => {
        // 隐藏对话框
        this.dialogFormVisible = false
        // 把页码设置成第一页
        this.reParams.page = 1
        // 重新获取素材图片
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style lang='less' scoped>
.img_container{

    .image_list {
        margin-top: 20px;
        .image_item {
            width: 160px;
            height: 160px;
            border: 1px dashed #ddd;
            position: relative;
            display: inline-block;
            margin-right: 50px;
            margin-bottom: 20px;
            img {
                width: 100%;
                height: 100%;
                display: block;
            }
            .image_btn {
                width: 100%;
                height: 30px;
                background: rgba(0,0,0,.3);
                position: absolute;
                left: 0;
                bottom: 0;
                text-align: center;
                line-height: 30px;
                color: #fff;
                span {
                    margin: 0 25px;
                    &.red{
                        color:red;
                    }
                }
            }
        }
    }
}
</style>
