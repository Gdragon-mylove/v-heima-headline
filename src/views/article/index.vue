<template>
 <div class="container">
     <el-card class="box-card">
        <div slot="header">
            <my-bread>内容管理</my-bread>
        </div>
        <el-form label-width="80px" size="small">
          <el-form-item label="状态： ">
            <el-radio-group v-model="reParams.status">
                <el-radio :label="null">全部</el-radio>
                <el-radio :label="6">草稿</el-radio>
                <el-radio :label="9">待审核</el-radio>
                <el-radio :label="1">审核通过</el-radio>
                <el-radio :label="2">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道： ">
            <!-- 使用频道组件 -->
              <my-channel v-model="reParams.channel_id"></my-channel>
          </el-form-item>
          <el-form-item label="日期： ">
              <div class="block">
                <!-- 处理日期数据+ -->
                <el-date-picker
                v-model="dateArr"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
                value-format="yyyy-mm-dd"
                >
                </el-date-picker>
              </div>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" @click="search()">筛选</el-button>
          </el-form-item>
        </el-form>
     </el-card>
     <!-- 筛选结果部分 -->
     <el-card>
        <div slot="header">根据筛选条件共查询到 {{ total }} 条结果：</div>
        <!-- 表格部分 -->
        <el-table :data="articles">
            <el-table-column label="封面">
                <template slot-scope="scope">
                    <el-image
                    style="width: 160px; height: 100px"
                    :src="scope.row.cover.images[0]"
                    fit="cover">
                        <div slot="error">
                          <img src="../../assets/images/error.gif" alt="" style="width: 160px; height: 100px">
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="状态">
               <template slot-scope="scope">
                 <!-- scope.row.status的值不同代表不同的状态 看api文档-->
                  <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
                  <el-tag v-if="scope.row.status===1">待审核</el-tag>
                  <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
                  <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
                  <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
               </template>
            </el-table-column>

            <el-table-column label="发布时间" prop="pubdate">

            </el-table-column>
            <el-table-column label="操作" width="120px">
               <template slot-scope="scope">
                   <el-button @click="$router.push('/publish?id='+scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
                   <el-button type="danger" icon="el-icon-delete" circle plain @click="delArticle(scope.row.id)"></el-button>
               </template>
            </el-table-column>
        </el-table>
        <!-- 分页部分 -->
        <!-- 绑定current-change事件，改变页数时会触发 -->
        <el-pagination
        class="pager"
        background
        layout="prev, pager, next,total"
        :current-page="reParams.page"
        :page-size="reParams.per_page"
        :total="total"
        @current-change="changePage"
        >
        </el-pagination>
     </el-card>
 </div>
</template>
<script>
export default {
  // 给频道选项赋值，渲染频道选项数据
  created () {
    // 调用函数获取频道选项数据
    // this.getchannelOptions()

    // 调用获取函数获取文章列表数据
    this.getarticles()
  },
  data () {
    return {
      // 提交后台参数，值为null的时候，字段就不会发送给后台的
      reParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 10
      },
      // 频道选项数据
      // channelOptions: [],

      // 日期选项数据
      dateArr: [],

      // 文章列表数据
      articles: [],

      total: 0 // 当前总条数
    }
  },
  methods: {
    // 选择时间
    changeDate (valueArr) {
      if (valueArr) {
        // 给请求参数赋值
        this.reParams.begin_pubdate = valueArr[0]
        this.reParams.end_pubdate = valueArr[1]
      } else {
        // 清除请求数据为空
        this.reParams.begin_pubdate = null
        this.reParams.end_pubdate = null
      }
    },
    // 发送请求，通过异步写法函数来给频道选项赋值
    // async getchannelOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },

    // 发送请求，通过异步函数给文章列表赋值
    // post 请求 post(‘地址’，‘数据’)
    // get 请求 get(‘地址’，{params:数据})
    async getarticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reParams })
      this.articles = data.results
      // 把总条数赋值返回数据
      this.total = data.total_count
      // console.log(this.articles)
    },
    // 切换分页实现
    changePage (newPage) {
      // 把提交给后台的参数切换成新的页码,触发时获取当前新的页码
      this.reParams.page = newPage
      this.getarticles()
    },
    // 实现筛选功能
    search () {
      // 当用户重新筛选的时候，当前页码应该为第一页
      this.reParams.page = 1
      // 频道需要做处理，当频道数据值为‘’的时候,处理成null
      if (this.reParams.channel_id === '') {
        this.reParams.channel_id = null
      }
      // 然后把文章重新刷新一遍,得到新的文章数据
      this.getarticles()
    },
    delArticle (id) {
      // 引入一个弹框组件提示用户
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认触发的函数，发送delete删除数据请求
        await this.$http.delete(`articles/${id}`)
        // 删除成功做出提示
        this.$message.success('删除成功')
        // 然后刷新页面重新获取文章
        this.getarticles()
      }).catch(() => {
        // 点击取消触发的函数
        this.$message.info('取消删除')
      })
    }
  }
}

</script>

<style lang='less' scoped>
  .el-card {
    margin-bottom: 20px;
  }
  .pager {
    text-align: center;
    margin-top: 20px;
  }
</style>
