//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

import { reqGoodsInfo } from "@/api/index.js"
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {

    async getGoodInfo({ commit }, skuId) {
        console.log("send"+skuId);
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
            console.log(result);
        }
    }
};
//准备mutations对象——修改state中的数据
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo

    }
}
//准备state对象——保存具体的数据
const state = {
    goodInfo: {},
}
//理解为计算属性，用于简化仓库数据，让组件获取仓库数据更方便
//数据层级太多，用getter简化
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView||{}   //解决还没数据时undefined问题,至少是空对象
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}   //至少是空对象
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]   //至少是空数组
    },
}  

//创建并暴露store
export default{
    actions,
    mutations,
    state,
    getters
}