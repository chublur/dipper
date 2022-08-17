<template>
  <el-menu
    default-active="1-4-1"
    background-color="#386078"
    text-color="#FAF9F9"
    active-text-color="#63BEE2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "北斗星后台管理系统" }}</h3>
    <el-menu-item
      v-for="item in nochildren"
      :index="item.path"
      :key="item.path"
      @click="clickmenu(item)"
    >
      <i :class="item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in haschildren"
      :index="item.path + ''"
      :key="item.path"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 二级菜单的遍历 -->
      <el-menu-item-group
        v-for="(subitem, subindex) in item.children"
        :key="subitem.path"
      >
        <el-menu-item
          @click="clickmenu(subitem)"
          :index="subindex.toString()"
          >{{ subitem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>



<script>
export default {
  data() {
    return {
      menu: [],
      // [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "el-icon-menu",
      //     url: "home/index",
      //   },
      //   {
      //     path: "/report",
      //     name: "report",
      //     label: "数据报表",
      //     icon: "el-icon-s-data",
      //     url: "report/index",
      //   },
      //   {
      //     path: "/map",
      //     name: "map",
      //     label: "地图",
      //     icon: "el-icon-location",
      //     url: "baidumap/index",
      //   },
      //   {
      //     label: "系统",
      //     icon: "el-icon-setting",
      //     children: [
      //       {
      //         path: "/userinfo",
      //         name: "userinfo",
      //         label: "用户管理",
      //         icon: "setting",
      //         url: "others/userinfo.vue",
      //       },
      //       {
      //         path: "/pageone",
      //         name: "pageone",
      //         label: "开发",
      //         icon: "setting",
      //         url: "other/pageone.vue",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickmenu(item) {
      this.$router.push({
        name: item.name,
      });
      this.$store.commit("selectmenu", item);
    },
  },
  computed: {
    nochildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    haschildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    // 拿到vuex中定义的属性
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 900px;
}
.el-menu--collapse {
  min-height: 900px;
}
.el-menu {
  height: 900px;
  border: none;
  border-bottom-right-radius: 10px;
  // transition: all 0.5s linear;
  h3 {
    color: #faf9f9;
    text-align: center;
    line-height: 48px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 0 20px;
    padding: 18px 0px;
  }
}
</style>