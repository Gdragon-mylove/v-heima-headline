<template>
    <div class="c-container">
        <el-card>
            <div slot="header">
                <my-bread>评论管理</my-bread>
            </div>
            <!-- 表格部分 -->
            <el-table :data="articles">
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
                <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    {{scope.row.comment_status?'正常':'关闭'}}
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" size="small" v-if="scope.row.comment_status" @click="getCommentstatus(scope.row)">关闭评论</el-button>
                    <el-button type="success" size="small" v-else @click="getCommentstatus(scope.row)">打开评论</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <!-- 分页部分 -->
            <el-pagination
            style="text-align:center;margin-top:20px"
            background
            @current-change="changePage"
            :current-page="reParams.page"
            :page-size="reParams.per_page"
            layout="total, prev, pager, next"
            hide-on-single-page
            :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      total: 0,
      reParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      }
    }
  },
  created () {
    this.getCommentlist()
  },
  methods: {
    async getCommentlist () {
      // 发送请求返回评论数据
      const { data: { data } } = await this.$http.get('articles', { params: this.reParams })
      console.log(data)
      this.articles = data.results
    },
    // 获取当前点击的新页码
    changePage (newPage) {
      this.reParams.page = newPage
      this.getCommentlist()
    },
    // 发送评论状态请求
    async getCommentstatus (status) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${status.id}`
        , { allow_comment: !status.comment_status })
      // 如果成功就提示关闭评论成功或者打开评论成功
      this.$message.success(data.allow_comment ? '关闭评论成功' : '打开评论成功')
      // 评论状态返回数据赋值
      status.comment_status = data.allow_comment
    }
  }
}
</script>

<style lang='less' scoped>

</style>
