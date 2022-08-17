<template >
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <!-- 用户展示卡片 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userimg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022年</span></p>
          <p>上次登录地点：<span>广东-佛山</span></p>
        </div>
      </el-card>
      <!-- 订单数据显示卡片 -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table
          :data="this.tabledata"
          style="width: 100%"
          height="460"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            v-for="(item, rowIndex) in tablelabel"
            :key="rowIndex"
            :prop="rowIndex"
            :label="item"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <!-- 订单相关统计 -->
        <el-card
          v-for="(item, index) in countdata"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- echart图表区域 -->
      <el-card style="height: 400px">
        <el-button id="back" >返回全国</el-button>
        <div id="china-map"></div>
      </el-card>
      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px">
          <div style="height: 240px" ref="userEcharts"></div>
        </el-card>
        <!-- 温度河流图 -->
        <el-card style="height: 260px">
          <div style="height: 250px" ref="tempEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// import Vue from "vue";
import { mapGetters } from "vuex";
// 引入地图的js文件
import "@/config/map/china.js";
import "@/config/map/province/guangdong"
// 引入echarts
import * as echarts from "echarts";
import { getmenu } from "@/api/index";
export default {
  name: "home",
  data() {
    return {
      userimg: require("@/assets/girl.jpeg"),
      tablelabel: {
        name: "快件编号",
        goodscatch: "物流追踪",
        temperature: "温度/湿度",
      },
    };
  },
  mounted() {
    // 派发订单数据
    this.$store.dispatch("gettabledata");
    // 派发统计数据
    this.$store.dispatch("getcountdata");
    // 派发柱形图信息
    this.$store.dispatch("getuserdata");
    // 派发温度信息
    this.$store.dispatch("gettemperature");
    // 地图绘图
    var myChart = echarts.init(document.getElementById("china-map"));
    var oBack = document.getElementById("back");

    var provinces = [
      "shanghai",
      "hebei",
      "shanxi",
      "neimenggu",
      "liaoning",
      "jilin",
      "heilongjiang",
      "jiangsu",
      "zhejiang",
      "anhui",
      "fujian",
      "jiangxi",
      "shandong",
      "henan",
      "hubei",
      "hunan",
      "guangdong",
      "guangxi",
      "hainan",
      "sichuan",
      "guizhou",
      "yunnan",
      "xizang",
      "shanxi1",
      "gansu",
      "qinghai",
      "ningxia",
      "xinjiang",
      "beijing",
      "tianjin",
      "chongqing",
      "xianggang",
      "aomen",
    ];

    var provincesText = [
      "上海",
      "河北",
      "山西",
      "内蒙古",
      "辽宁",
      "吉林",
      "黑龙江",
      "江苏",
      "浙江",
      "安徽",
      "福建",
      "江西",
      "山东",
      "河南",
      "湖北",
      "湖南",
      "广东",
      "广西",
      "海南",
      "四川",
      "贵州",
      "云南",
      "西藏",
      "陕西",
      "甘肃",
      "青海",
      "宁夏",
      "新疆",
      "北京",
      "天津",
      "重庆",
      "香港",
      "澳门",
    ];

    var seriesData = [
      {
        name: "北京",
        value: 100,
      },
      {
        name: "天津",
        value: 0,
      },
      {
        name: "上海",
        value: 60,
      },
      {
        name: "重庆",
        value: 0,
      },
      {
        name: "河北",
        value: 60,
      },
      {
        name: "河南",
        value: 60,
      },
      {
        name: "云南",
        value: 0,
      },
      {
        name: "辽宁",
        value: 0,
      },
      {
        name: "黑龙江",
        value: 0,
      },
      {
        name: "湖南",
        value: 60,
      },
      {
        name: "安徽",
        value: 0,
      },
      {
        name: "山东",
        value: 60,
      },
      {
        name: "新疆",
        value: 0,
      },
      {
        name: "江苏",
        value: 0,
      },
      {
        name: "浙江",
        value: 0,
      },
      {
        name: "江西",
        value: 0,
      },
      {
        name: "湖北",
        value: 60,
      },
      {
        name: "广西",
        value: 60,
      },
      {
        name: "甘肃",
        value: 0,
      },
      {
        name: "山西",
        value: 60,
      },
      {
        name: "内蒙古",
        value: 0,
      },
      {
        name: "陕西",
        value: 0,
      },
      {
        name: "吉林",
        value: 0,
      },
      {
        name: "福建",
        value: 0,
      },
      {
        name: "贵州",
        value: 0,
      },
      {
        name: "广东",
        value: 597,
      },
      {
        name: "青海",
        value: 0,
      },
      {
        name: "西藏",
        value: 0,
      },
      {
        name: "四川",
        value: 60,
      },
      {
        name: "宁夏",
        value: 0,
      },
      {
        name: "海南",
        value: 60,
      },
      {
        name: "台湾",
        value: 0,
      },
      {
        name: "香港",
        value: 0,
      },
      {
        name: "澳门",
        value: 0,
      },
    ];

    oBack.onclick = function () {
      initEcharts("china", "中国");
    };

    initEcharts("china", "中国");

    // 初始化echarts
    function initEcharts(pName, Chinese_) {
      var tmpSeriesData = pName === "china" ? seriesData : [];

      var option = {
        title: {
          text: Chinese_ || pName,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}",
        },
        legend: {
          //闪点提示
          orient: "vertical",
          x: "left",
          y: "bottom",
          textStyle: {
            color: "yellow",
          },
        },
        series: [
          {
            name: Chinese_ || pName,
            type: "map",
            mapType: pName,
            roam: false, //是否开启鼠标缩放和平移漫游
            // data: tmpSeriesData,
            data: (function () {
              // 需要展示闪点的数据遍历
              var serie = [];
              for (var i = 15; i < tmpSeriesData.length; i++) {
                var item = {
                  name: tmpSeriesData[i].name,
                  value: tmpSeriesData[i].value,
                };
                serie.push(item);
              }
              return serie;
            })(),
            top: "3%", //组件距离容器的距离
            zoom: 1.1,
            selectedMode: "single",
            label: {
              normal: {
                show: true, //显示省份标签
                textStyle: { color: "#fbfdfe" }, //省份标签字体颜色
                position: "top",
              },
              emphasis: {
                //对应的鼠标悬浮效果
                show: true,
                textStyle: { color: "#323232" },
              },
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5, //区域边框宽度
                borderColor: "#0550c3", //区域边框颜色
                areaColor: "#4ea397", //区域颜色
                color: "yellow",
              },

              emphasis: {
                borderWidth: 0.5,
                borderColor: "#4b0082",
                areaColor: "#ece39e",
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      myChart.off("click");

      if (pName === "china") {
        // 全国时，添加click 进入省级
        myChart.on("click", function (param) {
          console.log(param);
          // 遍历取到provincesText 中的下标  去拿到对应的省js
          for (var i = 0; i < provincesText.length; i++) {
            if (param.name === provincesText[i]) {
              //显示对应省份的方法
              showProvince(provinces[i], provincesText[i]);
              break;
            }
          }
          if (param.componentType === "series") {
            var provinceName = param.name;
            $("#box").css("display", "block");
            $("#box-title").html(provinceName);
          }
        });
      } else {
        // 省份，添加双击 回退到全国
        myChart.on("dblclick", function () {
          initEcharts("china", "中国");
        });
      }
    }

    // 展示对应的省
    function showProvince(pName, Chinese_) {
      //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
      loadBdScript(
        "$" + pName + "JS",
        "./src/config/map/province/" + pName + ".js",
        function () {
          initEcharts(Chinese_);
        }
      );
    }

    // 加载对应的JS
    function loadBdScript(scriptId, url, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      if (script.readyState) {
        //IE
        script.onreadystatechange = function () {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        // Others
        script.onload = function () {
          callback();
        };
      }
      script.src = url;
      script.id = scriptId;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    // 柱状图
    const userOption = {
      legend: {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: this.userdata.map((item) => item.date),
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#386078",
            },
          },
        },
      ],
      color: ["#8E5089", "#86C6EE"],
      series: [
        {
          name: "新增用户",
          data: this.userdata.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: this.userdata.map((item) => item.active),
          type: "bar",
        },
      ],
    };
    const U = echarts.init(this.$refs.userEcharts);
    U.setOption(userOption);

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
      tabledata: "tableinfo",
      countdata: "countinfo",
      userdata: "userinfo",
      temperature: "temperatureinfo",
    }),
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>
<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
#china-map {
  width: 100%;
  height: 380px;
  margin: auto;
}
#back {
  cursor: grab;
  /*cursor: -webkit-grab;*/
}
#box {
  display: none;
  background-color: goldenrod;
  width: 180px;
  height: 30px;
}
#box-title {
  display: block;
}
</style>