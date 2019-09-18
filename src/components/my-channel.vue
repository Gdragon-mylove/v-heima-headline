<template>
  <div>
    <template>
        <el-select :value="value" placeholder="请选择" @change="fn" clearable>
            <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
    </template>
  </div>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 当前选择的值
      // curchannel: null,
      // 获取频道数据
      channelOptions: []
    }
  },
  created () {
    this.getchannelOptions()
  },
  methods: {
    async getchannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
