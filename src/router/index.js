import Vue from 'vue';
import VueRouter from 'vue-router'

import Home from '@/views/Home/Home.vue'   //@等于src目录下
import Register from '@/views/Register'
import Search from '@/views/Search/index.vue'
import Login from '@/views/Login'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'

import store from "@/store"  //引入仓库

let router = new VueRouter({  //路由规则
    routes: [
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            path: '/search/:keyword',
            component: Search,
            meta: { show: true },  //用路由源信息鉴权
            name: 'search'
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false },
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false },
        },
        {
            path: '/detail/:skuId',  //占位符
            component: Detail,
            meta: { show: true },
        },
        {
            //购物车成功
            path: '/addcartsuccess',
            component: AddCartSuccess,
            name: "addCartSuccess",
            meta: { show: true },

        },
        {
            //购物车
            path: '/shopcart',
            component: ShopCart,
            name: "shopCart",
            meta: { show: true },

        },
        //重定向，默认进入home页面
        {
            path: '*',
            redirect: '/home'
        }
    ],
    //路由跳转后，轮动位置
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    // to：去哪
    // from：从哪个路由来 
    // next:放行函数  next(path) 放行到指令路由
    let token = store.state.user.token //获取
    let name = store.state.user.userInfo.name;   //不能直接判断空对象，因为也是真，通过判断对象中具体值是否为空

    if (token) {
        if (to.path == "/login") { //有token想去login
            next('/home')  //指定转去路径/home
            console.log("已登陆，跳转home")
        } else {
            //登陆了，但是去的不是login
            if (name) {    //有token，且有用户信息
                next();   //放行 
            } else {   //没有用户信息
                try {
                    await store.dispatch("getUserInfo");  //通过token向服务器获取用户信息
                    console.log("已登陆，获取用户信息成功")
                    next();   //成功才放行
                } catch (error) {
                    //获取失败，可能是token过期失效
                    //清除token，重新登陆
                    console.log("验证token获取用户信息失败，重新登陆")
                    await store.dispatch('userLogOut');
                    localStorage.removeItem("")
                    next('/login');
                }
            }
        }
    } else {   //未登陆，没有token
        if (to.path == "/shopcart") {   //想去购物车
            console.log("跳转登陆")
            next('/login')  //导向登陆页面
        } else {
            //没登陆，去的不是购物车
            next();  //放行
        }

    }


})


export default router
