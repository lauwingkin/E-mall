import Vue from 'vue';
import VueRouter from 'vue-router'

//一级路由
import Home from '@/views/Home/Home.vue'   //@等于src目录下
import Register from '@/views/Register'
import Search from '@/views/Search/index.vue'
import Login from '@/views/Login'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'

//二级路由
import MyOrder from "@/views/Center/MyOrder"
import GroupOrder from "@/views/Center/GroupOrder"

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
        {
            //交易订单
            path: '/trade',
            component: Trade,
            name: "trade",
            meta: { show: true },
            //路由独享守卫
            beforeEnter:(to,from,next)=>{
                    if(from.path=='/shopcart'){  //只有从购物车跳过来才放行
                        next();
                    }else{
                        next(false);  //从哪来，回哪去
                    }
            }
        },
        {
            //支付
            path: '/pay',
            component: Pay,
            name: "pay",
            meta: { show: true },
            beforeEnter:(to,from,next)=>{
                        if(from.path=='/trade'){  //只有从交易跳过来才放行
                            next();
                        }else{
                            next(false);  //从哪来，回哪去
                        }
                }
           

        },
        {
            //支付成功
            path: '/paysuccess',
            component: PaySuccess,
            name: "paysuccess",
            meta: { show: true },

        },
        { //个人中心
            path: '/center',
            component: Center,
            name: "Center",
            meta: { show: true },
            children: [
                {
                    path: 'myorder',  //不用反斜线
                    component: MyOrder
                },
                {
                    path: 'grouporder',
                    component: GroupOrder
                },
                {
                    path:'/center',
                    redirect:'/center/myorder'   //默认重定向路径
                }
            ]
        },
        //重定向，默认进入home页面
        {
            path: '*',
            redirect: '/home'
        },

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

        // let toPath=to.path;
        // if (toPath == '/home'||toPath=='/search') {    
        //     next()  //放行
        // } else {
        //     //没登陆，去的不是主页和搜索
        //     //console.log("跳转登陆")
        //     // next('/login?redirect='+toPath);  //导向登陆页面,登陆后再去想去的页面
        //     next('/login');
        // }
        if (to.path == "/shopcart") {   //想去购物车
            console.log("跳转登陆")
            next('/login')  //导向登陆页面
        } else {
            //没登陆，去的不是购物车
            next();  //放行
        }
//   console.log("跳转登陆")
//         next('/login');


    }


})


export default router
