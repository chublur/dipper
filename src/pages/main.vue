<template >
  <el-container style="height:100%">
  <el-aside width="auto">
   <commonaside></commonaside>
  </el-aside>
  <el-container>
    <el-header>
      <commonheader></commonheader>
    </el-header>
    <el-main>
      <!-- 展示内容的区域 -->
      <router-view ></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import commonheader from '@/components/commonheader'
import commonaside from '@/components/commonaside'
export default {
  name: "home",
  components: { commonaside,commonheader },
  
};
</script>
<style lang="less" scoped>
.el-header{
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  // box-shadow: 1px 1px 0 0;
}

</style>