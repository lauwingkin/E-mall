// //引入Vue核心库
// import Vue from 'vue'
// //引入Vuex
// import Vuex from 'vuex'
// //应用Vuex插件
// Vue.use(Vuex)

import { reqCartList,reqDeleteCartById ,reqUpdateCheckCartById} from "@/api"

//小仓库，上面不需要

//准备actions对象——响应组件中用户的动作
const actions = {
    async getCartList({commit}){
        let result =await reqCartList();
        console.log("get CartList");
        if(result.code==200){
            console.log("CartList" + result.data);
             commit("GETCARTLIST",result.data)
        }
    },
    
    async deleteCartListBySkuId({commit},skuId){
        let result =await reqDeleteCartById(skuId);
        console.log("delete send");
        if(result.code==200){
            console.log("delete" + result.data);
            //服务器不会返回data
             //返回
             return 'ok'
        }
        else{
            return Promise.reject(new Error('failed'));
        }
    },
    
    async updateCheckedById({commit},{skuId,isChecked} ){
        let result =await reqUpdateCheckCartById(skuId,isChecked);
        console.log("update send");
        if(result.code==200){
            console.log("update" + result.data);
            //服务器不会返回data
             //返回
             return 'ok'
        }
        else{
            return Promise.reject(new Error('failed'));
        }
    },
    
    //删除全部勾选产品
    deleteAllCheckedCart({dispatch,getters}){
        //context小仓库：commit（提交mutations修改state），getters（计算属性），dispatch（派发action），state（当前仓库数据）
        //getters间接获取state
        let promiseAll=[]
        getters.cartList.cartInfoList.forEach(item=>{
           // if(item.isChecked) dispatch("deleteCartListBySkuId",item.skuId);
           let promise = item.isChecked==1?dispatch("deleteCartListBySkuId",item.skuId):'';   //此方法可以获取promise的返回值
           promiseAll.push(promise)
        });
        //Promise.all([p1,p2,p3]),p1p2都是promise对象，如果其中一个失败，算失败；全部成功，才返回成功
        return Promise.all(promiseAll);
    },
    //全部产品勾选状态修改
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll=[];
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked:isChecked})
            promiseAll.push(promise)
        });
        console.log("updateCheckedById")
        return Promise.all(promiseAll);
    }
}
//准备mutations对象——修改state中的数据
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
//准备state对象——保存具体的数据
const state = {
    cartList:[]

}
//理解为计算属性，用于简化仓库数据，让组件获取仓库数据更方便
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    }
}

//创建并暴露store
export default ({
	actions,
	mutations,
	state,
    getters 
})