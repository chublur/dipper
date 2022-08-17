<template >
  <el-row class="home" :gutter="30">
    <el-col :span="24" > 
      <el-card shadow="hover" style="height: 800px">
        <div id="container"></div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "baidumap",
  mounted() {
    var map = new BMapGL.Map("container");
    // 创建地图实例
    var point = new BMapGL.Point(113.187728, 23.445930);
    // 创建点坐标
    // 初始化地图，设置中心点坐标和地图级别  就是放大的倍数
    map.centerAndZoom(point, 15);
    // 定时器后移动到新坐标
    // window.setTimeout(function(){
    // 	map.panTo(new BMapGL.Point(113.180928, 23.44410));
    // },2000);
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    // 使用Map.addControl()方法向地图添加控件。
    var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
    map.addControl(zoomCtrl);
    var cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
    map.addControl(cityCtrl);

    // 向地图中添加文本标注 这里的point 在上面已经定义了
    var content = "";
    var label = new BMapGL.Label(content, {
      // 创建文本标注
      position: point, // 设置标注的地理位置
      offset: new BMapGL.Size(10, 20), // 设置标注的偏移量
    });
    // 修改标注的样式
    label.setStyle({
      // 设置label的样式
      color: "#000",
      fontSize: "20px",
      border: "1px solid skyblue",
    });
    map.addOverlay(label);

    // 可加监听事件
    label.addEventListener("click", function () {
      // alert("您点击了标注");
      map.openInfoWindow(infoWindow, point);
    });

    // 信息窗口
    var opts = {
      width: 250, // 信息窗口宽度
      height: 100, // 信息窗口高度
      title: "北斗星物流管理系统--快件定位", // 信息窗口标题
    };
    var infoWindow = new BMapGL.InfoWindow("地址：广州工商学院三水校区 Temperature:32℃</br>Humidity:36%", opts); // 创建信息窗口对象
    map.openInfoWindow(infoWindow, point); // 打开信息窗口

    // 地址解析
    // var map = new BMapGL.Map('container');
    // map.centerAndZoom(new BMapGL.Point(113.180928, 23.44410), 12);
    // //创建地址解析器实例
    // var myGeo = new BMapGL.Geocoder();
    // // 将地址解析结果显示在地图上，并调整地图视野
    // myGeo.getPoint('汕头市潮阳区海门镇', function(point){
    //     if(point){
    //         map.centerAndZoom(point, 16);
    //         map.addOverlay(new BMapGL.Marker(point, {title: '北京市海淀区上地10街'}))
    //     }else{
    //         alert('您选择的地址没有解析到结果！');
    //     }
    // }, '广东省')
    //   }
  },
};
</script>
<style scoped>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#container {
  height: 800px;
  width: 100%;
}
</style>

