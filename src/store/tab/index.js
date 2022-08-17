import Cookie from 'js-cookie'

const state = {
    isCollapse: false,
    // 面包屑
    // 初始数据
    tablist: [
        {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'home'
        }
    ],
    currentmenu: null,
    menu:[]
}

const mutations = {
    // 定义个方法
    Collapsemenu(state) {
        state.isCollapse = !state.isCollapse;
    },
    selectmenu(state, val) {
        if (val.name !== 'home') {
            state.currentmenu = val;
            const res = state.tablist.findIndex(item => item.name === val.name);
            if (res === -1) {
                state.tablist.push(val)
            }
        } else {
            state.currentmenu=null;
        }
    },
    closeTag(state, val) {
        const result = state.tabsList.findIndex(item => item.name === val.name);
        state.tabsList.splice(result, 1);
    },
    setMenu(state,val){
        state.menu=val
        Cookie.set('menu',JSON.stringify(val))
    },
    clearMenu(state){
        state.menu=[]
        Cookie.remove('menu')
    },
    addMenu(state,router){
        if(!Cookie.get('menu')){
            return 
        }
        const menu =JSON.parse(Cookie.get('menu'))
        state.menu=menu
        const menuArray=[]
        menu.forEach(item=>{
            if(item.children){
                item.children=item.children.map(item=>{
                    item.component=()=>import(`@/pages/${item.url}`)
                    return item
                })
                menuArray.push(...item.children)
            }else{
                item.component=()=>import(`@/pages/${item.url}`)
                menuArray.push(item)
            }
        });
        // 动态路由的添加
        menuArray.forEach(item=>{
            router.addRoute('main',item)
        })
    }
}
const actions = {}

const getters = {}

export default {
    // 开启命名空间 提高复用率和封装度
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
}