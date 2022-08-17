// 通过mockjs插件模拟数据
// 引入mockjs 
import Mock from 'mockjs';
// 把json数据引入进来  json文件默认对外暴露  所以可以直接引入
// webpack默认对外暴露的 ：图片 json数据格式 
import tabledata from './tabledata.json';
import countdata from './countdata.json';
import userdata from './userdata.json';
import temperature from './temperature.json';
import ordersdata from './ordersdata.json';
// mock数据：第一个参数请求地址 第二个参数 请求数据
Mock.mock("/mock/tabledata",{code:200,data:tabledata});  //模拟首页订单的数据
Mock.mock("/mock/countdata",{code:200,data:countdata});  //模拟首页统计数的数据
Mock.mock("/mock/userdata",{code:200,data:userdata});  //柱状图模拟用户数据
Mock.mock("/mock/temperature",{code:200,data:temperature}); //模拟温湿度的数据
Mock.mock("/mock/ordersdata",{code:200,data:ordersdata});  //模拟订单详细信息的数据

import userApi from '@/mock/mockServerData/user';
import permissionApi from '@/mock/mockServerData/permission'
Mock.mock(/user\/add/, 'post',userApi.createUser);
Mock.mock(/user\/add/, 'post',userApi.updateUser);
Mock.mock(/user\/getUser/, 'get',userApi.getUserList);
Mock.mock(/user\/del/, 'post',userApi.deleteUser);
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)