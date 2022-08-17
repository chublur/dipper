// home模块的小仓库
import { reqordersdata } from '@/api';
// state 仓库存储数据的地方
const state = {
    // state中数据默认初始值别瞎写 服务器返回对象或者数组
    // tabledata数据
    ordersdata:[],
};

// mutations 修改state的唯一手段
const mutations = {
    GETORDERSDATA(state, ordersdata) {
        state.ordersdata = ordersdata;
    }
};

// actions 处理action 可以书写自己的业务逻辑 可以处理异步
const actions = {
    // 通过api里面的接口函数 向服务器发请求 获取服务器的数据
    // async await 两个必须同时存在
    
    async getordersdata({ commit }) {
        let res = await reqordersdata();
        if (res.code == 200) {
            // 提交mutation
            commit('GETORDERSDATA', res.data)
        }
    }

};

// getters 理解为计算属性 简化仓库数据  让获取仓库数据更加方便
const getters = {
    ordersinfo(state){
        return state.ordersdata||{};

    }
};

export default {
    // 开启命名空间 提高复用率和封装度  这里的不要开
    // namespaced: true,
    state, mutations, actions, getters
}
