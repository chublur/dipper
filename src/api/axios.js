import axios from "axios";
import config from "@/config";
// 引入进度条
import nprogress, { start } from 'nprogress'
// start :进度条开始  done 进度条结束
// 引入进度条样式
import "nprogress/nprogress.css";
// 对处于生产环境或开发环境的判断
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        
    }
    // 定义axios响应的配置
    getInsideConfig() {
        const config ={
            baseUrl: this.baseUrl,
            header:{}
        }
        return config
    }
    // 拦截器
    interceptors(instance) {
        instance.interceptors.request.use(function(config) {
            // 发送请求前做点什么
            console.log('拦截处理请求');
            
            return config;
        },
        // 请求错误做点什么
        function(error) {
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function(response) {
            // 响应成功做点什么
            console.log(response);
            nprogress.done();
            return response;
        },
        // 响应错误做点什么
        function(error) {
            console.log(error);
            return Promise.reject(error);
        });
    }
    request(options){
        nprogress.start();
        const instance= axios.create()
        options={...this.getInsideConfig(),...options}
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)