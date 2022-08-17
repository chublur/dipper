<template >
  <div class="common-table">
    <el-table :data="tabledata" height="660px" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tablelabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left=10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "commontable",
  props: {
    tabledata: Array,
    tablelabel: Array,
    config: Object,
  },
  methods: {
    handleEdit(row) {
        this.$emit('edit',row)
    },
    handleDelete(row) {
        this.$emit('del',row)
    },
    changePage(row){
         this.$emit('change',page)
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.common-table{
    height: calc(100%-62px);
    background-color: #fff;
    position: relative;
    .pager{
        position: absolute;
        bottom:0;
        right: 20px;
    }
}
.el-pager li.active {
    color: #386078 !important;
    cursor: default;
}
</style>