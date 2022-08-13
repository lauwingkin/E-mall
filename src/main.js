import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router/index'
import store from '@/store'

//注册全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
//第一个参数，全局组件名字（这里直接读取了name值），第二个参数，哪个一个组件
Vue.component(TypeNav.name,TypeNav);

//测试用
// import {reqCategoryList} from '@/api/index.js'
// reqCategoryList();

Vue.config.productionTip = false


Vue.use(VueRouter)

import '@/mock/mockServe'
import 'swiper/css/swiper.css'   //引包
 
new Vue({
  render:  h => h(App), 
  beforeCreate(){
    Vue.prototype.$bus=this  //安装全局事件总线
  },
  router,
  store
}).$mount('#app')
