// vuex
import Vue from "vue";
import Vuex from "vuex";
// 需要使用插件一次
Vue.use(Vuex);

// 引入我们的小仓库
import tab from './tab/index.js';
import tabledata from './tabledata/index.js';
import countdata from "./countdata/index.js";
import userdata from "./userdata/index.js";
import temperature from "./temperature/index.js";
import ordersdata from "./ordersdata/index.js";
import user from "./user/index.js";
// 对外暴露
export default new Vuex.Store({
    //实现vuex仓库模块化开发存储数据
    modules: { tab, tabledata, countdata,userdata,temperature,ordersdata,user}
})