// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由组件
import main from '@/pages/main.vue';
import Home from '@/pages/home';
import login from '@/pages/login';
import report from '@/pages/report';
import map from '@/pages/baidumap';
import userinfo from '@/pages/others/userinfo';
import pageone from '@/pages/others/pageone';
// 使用插件
Vue.use(VueRouter);
// 先把vuerouter原型对象的push 保存一份
let originpush=VueRouter.prototype.push;
let oringinreplace=VueRouter.prototype.replace;
// 重写push|replace
VueRouter.prototype.push=function(location,resolve,reject){
    if (resolve&&reject) {
        originpush.call(this,location,resolve,reject);
    }else{
        originpush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace=function(location,resole,reject){
    if (resole&&reject) {
        oringinreplace.call(this,location,resole,reject);
    }else{
        oringinreplace.call(this,location,()=>{},()=>{});
    }
}

export default new VueRouter({
    mode:'history',
    
    //配置路由
    routes: [
        {
            path:"/",
            component:main,
            name:'main',
            redirect:'/login',
            children: [
                // {
                //     path:"/home",
                //     name:'home',
                //     component:Home
                // },
                // {
                //     path:"/report",
                //     component:report,
                //     name:'report',
                // },
                // {
                //     path:"/map",
                //     component:map,
                //     name:'map',
                // },
                // {
                //     path:"/userinfo",
                //     component:userinfo,
                //     name:'userinfo',
                // },
                // {
                //     path:"/pageone",
                //     component:pageone,
                //     name:'pageone',
                // },
            ]
        },
        {
            path:"/login",
            component:login,
            name:'login',
        },
        
        // // 重定向 项目跑起来时 访问/，立马让他定义到首页
        // {
        //     path:'*',
        //     redirect:'/home'
        // }
    ],
    // 滚动行为 确保页面跳转 滚动条的位置
    // scrollBehavior (to, from, savedPosition) {
    //     // 返回的这个y=0 表示滚动条在最上方 不能有负数
    //     return {y:100};
    // }
})