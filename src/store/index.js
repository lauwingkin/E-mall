import Vue from 'vue'
import VueX from 'vuex'


Vue.use(VueX);

   
import home from './home'//引入小仓库
import search from './search'
import detail from './detail'
import shopCart from './shopCart';
import user from './user';
import trade from './trade'

//创建并暴露store
export default new VueX.Store({
	modules:{ 
        //namespaced: true,   
        home, 
        search,
        detail,
        shopCart,
        user,  
        trade
    }  
})