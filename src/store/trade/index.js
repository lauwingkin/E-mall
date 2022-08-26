import { reqAddressInfo, reqOrderInfo } from '@/api'
//准备actions对象——响应组件中用户的动作
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        console.log(result)
        if (result.code == 200) {
            console.log("获取地址信息成功")
            commit('GETUSERADRESS', result.data);
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        console.log(result)
        if (result.code == 200) {
            console.log("获取订单信息成功")
            commit('GETORDERINFO', result.data);
        }
    }
}
//准备mutations对象——修改state中的数据
const mutations = {
    GETUSERADRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }

}
//准备state对象——保存具体的数据
const state = {
    address: [],
    orderInfo: {}
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