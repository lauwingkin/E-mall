import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from "@/api"

import { setToken, removeToken } from "@/utils/token"
import { remove } from "nprogress";
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)  //得到实际应该发到手机的验证码
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok'
        } else {
            console.log(result);
            return Promise.reject(new Error('fail'))
        }

    },
    //注册
    async getUserRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            console.log("注册成功" + result)
            //commit("", result.data);
            return 'ok'
        } else {
            console.log(result);
            return Promise.reject(new Error('fail'))
        }
    },

    //登陆
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user)
        if (result.code == 200) {
            console.log("登陆成功")
            console.log(result)
            commit("USERLOGIN", result.data.token);
            //存进本地
            //localStorage.setItem("TOKEN",result.data.token)
            //上面被替代
            setToken(result.data.token)

            return 'ok'
        } else {
            console.log(result);
            return Promise.reject(new Error('fail'))
        }
    },

    //通过token放请求头，获取用户信息，在路由导航守卫触发
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        console.log("触发token获取用户数据");
        if (result.code == 200) {
            console.log("获取成功")
            console.log(result)
            commit("GETUERINFO", result.data);
            return 'ok'

        } else {
            console.log(result);
            return Promise.reject(new Error('fail'))
        }
    },
    //      async getUserRegister({commit},user){
    //   let result = await  reqUserRegister(user)
    //   if (result.code == 200) {
    //     console.log("注册成功"+result)
    //     //commit("", result.data);
    //     return 'ok'
    //   }else {
    //             console.log(result);
    //             return Promise.reject(new Error('fail'))
    //         }
    //     },

    //退出登陆 
    async userLogOut({ commit },) {
        let result = await reqLogOut()
        if (result.code == 200) {
            console.log("退出成功" + result)
            commit("CLEAR");   //action里面不能操作数据,要提交到mutation改
            return 'ok'
        } else {
            console.log(result);
            return Promise.reject(new Error('fail'))
        }
    },


}
//准备mutations对象——修改state中的数据
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token

    },
    GETUERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除数据
    CLEAR(state) {
        state.token = '',
        state.userInfo = {},
        removeToken()


    }

}
//准备state对象——保存具体的数据
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),  //这行可以封装成函数
    userInfo: {}
}
//理解为计算属性，用于简化仓库数据，让组件获取仓库数据更方便
const getters = {}

//创建并暴露store
export default ({
    actions,
    mutations,
    state,
    getters
})