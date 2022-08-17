// npm i js-cookie
import Cookie from 'js-cookie'
export default{
    state:{
        token:''
    },
    mutations:{
        setToken(state,val){
            state.token=val
            Cookie.set('token',val)
        },
        // 清除token
        clearToken(state){
            state.token=''
            Cookie.remove('token')
        },
        getToken(state){
            state.token=Cookie.get('token')||state.token
        }
    }
}