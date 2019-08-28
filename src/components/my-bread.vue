<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><slot></slot></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  // 给组件命名
  name: 'my-bread'
}
</script>

<style lang='less' scoped>

</style>
