<template >
  <el-row class="home" :gutter="20">
    <el-col :span="24" style="margin-top: 20px">
      <el-card shadow="hover" style="height: 400px">
        <el-table
          :data="
            ordersdata.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
          height="350"
        >
          <el-table-column
            v-for="(item, index) in labels"
            :key="index"
            :label="item"
            :prop="index"
          >
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
                class="searchinput"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 温度河流图 -->
    <el-col :span="12" style="margin-top: 20px">
      <el-card shadow="hover" style="height: 400px">
        <div style="height: 360px" ref="tempEcharts"></div>
      </el-card>
    </el-col>
    <!-- 温湿度仪表盘 -->
    <el-col :span="6" style="margin-top: 20px">
      <el-card shadow="hover" style="height: 400px">
      <el-tag color="#576879" effect="dark" style="border:none">湿度</el-tag>
        <el-progress
          type="circle"
          :percentage="41"
          :width="320"
          :stroke-width="30"
          color="#576879"
        >
          >
          </el-progress
        >
      </el-card>
    </el-col>
    <el-col :span="6" style="margin-top: 20px">
      <el-card shadow="hover" style="height: 400px">
      <el-tag color="#857a7d" effect="dark" style="border:none">湿度</el-tag>
        <el-progress
          type="circle"
          :percentage="32"
          :width="320"
          :stroke-width="30"
          color="#857a7d"
        >
          ></el-progress
        >
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
export default {
  name: "report",
  data() {
    return {
      labels: {
        num: "快件编号",
        address: "目的地",
        pickman: "取件人",
        thingstype: "物品类型",
        goodscatch: "物流追踪",
        goodsnum: "件数",
        temperature: "温湿度",
      },
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  mounted() {
    this.$store.dispatch("gettemperature");
    this.$store.dispatch("getordersdata");
    // 温度河流图
    const tempOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "rgba(0,0,0,0.2)",
            width: 1,
            type: "solid",
          },
        },
      },
      legend: {
        data: ["快件温度", "气温温度", "快件湿度", "空气湿度"],
      },
      singleAxis: {
        top: 50,
        bottom: 50,
        axisTick: {},
        axisLabel: {},
        type: "time",
        axisPointer: {
          animation: true,
          label: {
            show: true,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            opacity: 0.2,
          },
        },
      },
      series: [
        {
          type: "themeRiver",
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.8)",
            },
          },
          data: this.temperature.map((item) => item),
        },
      ],
    };
    const T = echarts.init(this.$refs.tempEcharts);
    T.setOption(tempOption);
  },
  computed: {
    ...mapGetters({
      temperature: "temperatureinfo",
      ordersdata: "ordersinfo",
    }),
  },
};
</script>
<style scoped>
</style>