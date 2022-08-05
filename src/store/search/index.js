import { reqGetSearchInfo } from "@/api"


//准备actions对象——响应组件中用户的动作
const actions = {
	async getSearchList({commit},params={}){  //params形参默认空对象
	let result =await reqGetSearchInfo(params)
		if(result.code==200){
			commit('GETSEARCHLIST',result.data); 
		}
	}
}
//准备mutations对象——修改state中的数据
const mutations = {
	GETSEARCHLIST(state,searchList){
		state.searchList=searchList

	}
}
//准备state对象——保存具体的数据
const state = {
	searchList:{},	 
}
//理解为计算属性，用于简化仓库数据，让组件获取仓库数据更方便
const getters = {
	//简化数据
	goodsList(state){      //新数据名
		return state.searchList.goodsList||[];  //原数据
		//如果网络不好或没网，至少要返回空数组，不然会出错
	  },
	  trademarkList(state){    
		return state.searchList.trademarkList||[]; //原数据
		//
	  },
	  attrsList(state){    
		return state.searchList.attrsList||[]; //原数据
		//
	  }



}

//创建并暴露
export default {
	actions,
	mutations,
	state,
    getters 
}