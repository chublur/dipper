// 对所有的api接口进行统一管理
import mockrequest from "./mockajax";
import http from "./axios";
//三级联动接口
// export const getmenu = () => {
//     //发请求 axios 返回结果是promise对象
//     return axios.requests({ url: '/permission/getmenu', method: 'post', data: param })
// };

// 获取订单数据
export const reqtabledata = () => mockrequest.get('/tabledata');

// 获取统计信息数据
export const reqcountdata = () => mockrequest.get('/countdata');

// 获取柱形图用户数据
export const requserdata = () => mockrequest.get('/userdata');

// 获取温湿度数据
export const reqtemperature = () => mockrequest.get('/temperature');

// 获取详细订单数据
export const reqordersdata = () => mockrequest.get('/ordersdata');

export const getUser=(params)=>{
    return http.request({
        url:'/user/getUser',
        method:'get',
        params
    })
}
// export const getMenu = (params) => http.post({
//     url:'/permission/getMenu',
//     data:params,
// })
export const getMenu=(param)=>{
    return http.request({
        url:'/permission/getMenu',
        method:'post',
        data:param
        
    })
}

