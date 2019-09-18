<template>
  <div p-container>
      <el-card>
          <div slot="header">
              <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
          </div>
          <!-- 表单部分 -->
          <el-form label-width="120px">
              <el-form-item label="标题：">
                  <el-input  v-model="reParams.title" style="width:400px"></el-input>
              </el-form-item>
              <el-form-item label="内容：">
                  <!-- 富文本组件 -->
                  <quill-editor v-model="reParams.content" :options="editorOption"></quill-editor>
              </el-form-item>
              <el-form-item label="封面：">
                  <el-radio-group v-model="reParams.cover.type" @change="changeType">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                  </el-radio-group>
                  <!-- 封面选择组件部分 -->
                  <div v-if="reParams.cover.type===1">
                    <my-image v-model="reParams.cover.images[0]"></my-image>
                  </div>
                  <div v-if="reParams.cover.type===3">
                    <my-image v-model="reParams.cover.images[0]"></my-image>
                    <my-image v-model="reParams.cover.images[1]"></my-image>
                    <my-image v-model="reParams.cover.images[2]"></my-image>
                  </div>
              </el-form-item>
              <el-form-item label="频道：">
                  <my-channel v-model="reParams.channel_id"></my-channel>
              </el-form-item>
              <el-form-item v-if="!articleId">
                  <!-- 可以根据布尔值来判断是发表还是存入草稿，正好与请求携带的参数布尔值对应 -->
                  <el-button type="primary" @click="submit(false)">发表</el-button>
                  <el-button @click="submit(true)">存入草稿</el-button>
              </el-form-item>
              <el-form-item v-else>
                  <!-- 可以根据布尔值来判断是发表还是存入草稿，正好与请求携带的参数布尔值对应 -->
                  <el-button type="success" @click="updata(false)">修改</el-button>
                  <el-button @click="updata(true)">存入草稿</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
// 挂载
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入富文本指定配置对象成员
import { quillEditor } from 'vue-quill-editor'
export default {
  // 注册全局组件
  components: {
    quillEditor
  },
  data () {
    return {
      // 富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      },
      // 发布文章需要请求的参数
      reParams: {
        title: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        content: ''
      },
      // 声明一个当前文章id
      articleId: null
    }
  },
  created () {
    // 获取当前文章数据中的id
    this.articleId = this.$route.query.id
    // 如果是编辑就获取指定编辑的文章数据
    // if (this.articleId) {
    //   this.getArticle()
    // }
    // 简写方式
    this.articleId && this.getArticle()
  },
  methods: {
    // 定义一个改变封面类型的方法
    changeType () {
      // 当选择过封面类型的时候，就把数据重置为空
      this.reParams.cover.images = []
    },
    async submit (draft) {
      // 这里省去l校验,发送请求
      await this.$http.post(`articles?draft=${draft}`, this.reParams)
      // 请求成功就提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 发表成功后页面跳转到内容管理
      this.$router.push('/article')
    },
    // 获取指定编辑的文章数据
    async getArticle () {
      const { data: { data } } = await this.$http.get(`articles/${this.articleId}`)
      // 填充指定编辑文章的表单
      this.reParams = data
    },
    async updata (draft) {
      // 发送请求修改文章，地址栏多了id，所以请求参数要携带id
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.reParams)
      this.$message.success(draft ? '修改存入草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style lang='less' scoped>
</style>
