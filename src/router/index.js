import Vue from 'vue';
import VueRouter from 'vue-router'

import Home from '@/views/Home/Home.vue'   //@等于src目录下
import Register from '@/views/Register/Register'
import Search  from '@/views/Search/index.vue'
import Login from '@/views/Login/Login'
import Detail from  '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'

export default  new VueRouter({  //路由规则
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            path:'/search/:keyword',
            component:Search,
            meta:{show:true},  //用路由源信息鉴权
            name:'search'
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false},
        },
        {
            path:'/register',
            component:Register,
            meta:{show:false},
        },
        {
            path:'/detail/:skuId',  //占位符
            component:Detail,
            meta:{show:true},
        },
        {
            //购物车成功
            path:'/addcartsuccess',
            component:AddCartSuccess,
            name:"addCartSuccess",
            meta:{show:true},

        },
        {
            //购物车
            path:'/shopcart',
            component:ShopCart,
            name:"shopCart",
            meta:{show:true},

        },
        //重定向，默认进入home页面
        {
            path:'*',
            redirect:'/home'
        }
    ],
    //路由跳转后，轮动位置
    scrollBehavior(to,from,savedPosition){
        return {y:0}
    }
})
 