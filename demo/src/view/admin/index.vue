<template>
<div>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    router="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="article">文章管理</el-menu-item>
    <el-menu-item index="mark">评论管理</el-menu-item>
    <el-menu-item index="tag">标签管理</el-menu-item>
    <el-menu-item index="statistic">数据统计</el-menu-item>
    <el-menu-item index="setting">博客设置</el-menu-item>
  </el-menu>
  <router-view/>
</div>

</template>



<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
