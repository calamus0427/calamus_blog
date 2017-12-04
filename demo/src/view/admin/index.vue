<template>
  <div>
    <header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="article">文章管理</el-menu-item>
        <el-menu-item index="mark">评论管理</el-menu-item>
        <el-menu-item index="tag">标签管理</el-menu-item>
        <el-menu-item index="statistic">数据统计</el-menu-item>
        <el-menu-item index="setting">博客设置</el-menu-item>
      </el-menu>
    </header>


    <div class="main">
      <router-view/>
    </div>
    <!-- <el-footer>Calamus</el-footer> -->
  </div>
</template>



<script>
  export default {
    data() {
      return {
        // activeIndex: 'article',
      };
    },
    computed:{
      activeIndex:function(){
        var str = window.location.href;
        var index = str .lastIndexOf("\/");
        str  = str .substring(index + 1, str .length);
        return str ;
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
header{
  position: fixed;
  top:0px;
  width:100%;
}
  .el-footer {
    position: fixed;
    bottom:0px;
    width:100%;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
.main{
  position:fixed;
  top:80px;
  height:610px;
  overflow:auto;
  width:100%;
}
</style>

