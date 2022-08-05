import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'

//准备state对象——保存具体的数据
const state = {
	//三联数据
	categoryList:[],
	//轮播图数据
	bannerList:[],
	floorList:[]
}
//准备mutations对象——修改state中的数据
const mutations = {
	CATEGORYLIST(state,categoryList){
		state.categoryList=categoryList;

	},
	BANNERLIST(state,bannerList){
		state.bannerList=bannerList;

	},
	FLOORLIST(state,floorList){
		state.floorList=floorList;

	}
};

//准备actions对象——响应组件中用户的动作
const actions = {
	// async categoryList(){
	// 	 	let result = await reqCategoryList();
	// 		console.log(result);
	// }
	async categoryList({commit}){
		let result =await reqCategoryList();
		if(result.code==200){
			commit("CATEGORYLIST",result.data);

		}

	 },
	 async getBannerList({commit}){
		let result =await reqBannerList();
		if(result.code==200){
			commit("BANNERLIST",result.data);  

		}

	 },
	 async getFloorList({commit}){
		let result =await reqFloorList();
		if(result.code==200){
			commit("FLOORLIST",result.data);

		}

	 }
}


//理解为计算属性，用于简化仓库数据，让组件获取仓库数据更方便
const getters = {}

//创建并暴露
export default {
	actions,
	mutations,
	state,
    getters 
}