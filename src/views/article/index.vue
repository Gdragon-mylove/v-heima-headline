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
              <el-select v-model="reParams.channel_id" placeholder="请选择">
                <el-option
                v-for="item in channelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="日期： ">
              <div class="block">
                <el-date-picker
                v-model="dateArr"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
                >
                </el-date-picker>
              </div>
          </el-form-item>
          <el-form-item>
             <el-button type="primary">筛选</el-button>
          </el-form-item>
        </el-form>
     </el-card>
     <!-- 筛选结果部分 -->
     <el-card>
        <div slot="header">根据筛选条件共查询到 0 条结果：</div>
        <!-- 表格部分 -->
        <el-table :data="articles">
            <el-table-column label="标题" prop="title"></el-table-column>
        </el-table>
        <!-- 分页部分 -->
        <el-pagination class="pager" background layout="prev, pager, next" :total="1000"></el-pagination>
     </el-card>
 </div>
</template>

<script>
import myBread from '@/components/my-bread.vue'
export default {
  components: { myBread },
  data () {
    return {
      // 提交后台参数，值为null的时候，字段就不会发送给后台的
      reParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道选项数据
      channelOptions: [{ id: 1, name: 'java' }],
      // 日期选项数据
      dateArr: [],
      // 文章列表数据
      articles: [{ title: '文章标题一' }, { title: '文章标题二' }]
    }
  },
  methods: {
    changeDate (value) {
      console.log(value)
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
