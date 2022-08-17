<template >
  <header>
    <div class="l-content">
      <el-button @click="handlemenu" plain icon="el-icon-menu"></el-button>
      <!-- <h3 style="color: #2c313f">首页</h3> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
        class="mycolor"
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span><img class="user" :src="userimg" /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "commonheader",
  data() {
    return {
      userimg: require("@/assets/girl.jpeg"),
    };
  },
  methods: {
    handlemenu() {
      this.$store.commit("tab/Collapsemenu");
    },
    logout(){
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapState({
      tags:(state)=>state.tab.tablist
    }),
  },
};
</script>
<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  // 上下居中
  align-items: center;
}
.l-content {
  display: flex;
  // 上下居中
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
// 重写样式
.mycolor /deep/ .el-breadcrumb__inner:hover{
  color: rgb(78, 163, 151);
}
</style>