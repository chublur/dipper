// mock请求专门的ajax
// 对axios进行二次封装
import axios from "axios";
// 在当前模块引入仓库
import store from "@/store";
// 引入进度条
import nprogress, { start } from 'nprogress'
// start :进度条开始  done 进度条结束
// 引入进度条样式
import "nprogress/nprogress.css";
// 1、利用axios对象的方法create 创建一个axios实例
// 2、request就是axios 只不过稍微配置一下
const requests=axios.create({
    //配置对象
    // 基础路径 发送请求时路径中会出现
    baseURL:"/mock",
    // 响应超时的时间 3s
    timeout:3000
});
// 请求拦截器 发请求之前 请求拦截器可以监测到 可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config是配置对象 里面有个请求头header
    // 进度条开始
    nprogress.start();
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 这里是成功的回调函数 服务器相应数据回来后 响应拦截器可以监测到
    // 进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
});

// 对外暴露
export default requests;