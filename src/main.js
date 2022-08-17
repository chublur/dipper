import Vue from 'vue'
import App from './App.vue'
// axios的全局引入
import http from 'axios'
// ElementUI引入 完整引入
import ElementUI from 'element-ui';
// import $ from 'jquery'
// Vue.prototype.$ = $;
import 'element-ui/lib/theme-chalk/index.css';
// import BMap from 'vue-baidu-map'
// import echarts from 'echarts'
// import 'echarts/extension/bmap/bmap';
Vue.use(ElementUI);
// 路由引入
import router from '@/router';
// Vue.use(BMap, { ak: "y1AS7qduaF1vCPKqRQ2cxcYv73pfsdqU" });

// 引入mockserver.js
import '@/mock/mockServer.js';

// 引入vuex
import store from '@/store';
Vue.config.productionTip = false;
// Vue.prototype.$echarts = echarts;
// Axios的使用
Vue.prototype.$http=http

Vue.prototype.$confirm=ElementUI.MessageBox.confirm
Vue.prototype.$message=ElementUI.Message
// 对样式进行引入
import '../public/css/index.less'

// 导航守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token=store.state.user.token
  if(!token&&to.name!=='login'){
    next({name:'login'})
  }
  // else if(token&&to.name ==='login'){
  //   next({name:'home'})
  // }
  else{
    next()
  }
})

new Vue({
  // 全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus=this;
  },  
  // 配置路由
  router,
  store,
  create(){
    store.commit('addMenu',router);
  },
  render: h => h(App),
}).$mount('#app')
