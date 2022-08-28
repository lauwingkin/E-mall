import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router/index'
import store from '@/store'

//注册全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'

import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui';

import VueLazyload from 'vue-lazyload'
import imgTest from '@/assets/logo.png'

//第一个参数，全局组件名字（这里直接读取了name值），第二个参数，哪个一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);


//测试用
// import {reqCategoryList} from '@/api/index.js'
// reqCategoryList();

Vue.config.productionTip = false


Vue.use(VueRouter)

Vue.use(VueLazyload,{
  //配置默认图
  loading:imgTest
})


//Vue.component(Button.name, Button);
Vue.prototype.$msgbox=MessageBox;
Vue.prototype.$alert=MessageBox.alert;

import '@/mock/mockServe'
import 'swiper/css/swiper.css'   //引包

import * as API from '@/api'

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this  //安装全局事件总线
    Vue.prototype.$API = API  //如同总线的方法
  },
  router,
  store
}).$mount('#app')
