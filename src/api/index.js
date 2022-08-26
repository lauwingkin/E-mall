
import requests from './request';

import mockRequests from './mockRequest'



//三级联动接口,发请求返回结果为promise 对象
export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'GET'
    });
}

export const reqBannerList = () => mockRequests({
     url: '/banner', method: 'GET' 
    });


export const reqFloorList = () => mockRequests({
        url: '/floor', method: 'GET' 
       });   


//带参数请求,当前接口至少要传空对象
export const reqGetSearchInfo = (params) => requests({
    url: '/list', 
    method: 'POST',
    data: params
   });  

//获取产品详情接口
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`, 
    method: 'GET'
   }); 
   
//产品添加到购物车
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'POST',
})

//获取购物车
export const reqCartList = () => requests({
    url: "/cart/cartList", 
    method: 'GET'
   }); 
   
 //删除购物车
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`, 
    method: 'DELETE'
   });   

   
export const reqUpdateCheckCartById = (skuId,isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`, 
    method: 'GET'
   });  

 //获取验证码  
export const reqGetCode= (phone) => requests({
    url: `/user/passport/sendCode/${phone}`, 
    method: 'GET'
   });   
   
//注册
export const reqUserRegister=(data)=>requests({
    url:`/user/passport/register`,
    data:data,    //传对象用body方式，不用query
    method:'POST',
})

//登陆
export const reqUserLogin=(data)=>requests({
    url:`/user/passport/login`,
    data:data,    //传对象用body方式，不用query
    method:'POST',
})

//用token获取信息,用请求头传参
export const reqUserInfo= () => requests({
    url: `/user/passport/auth/getUserInfo`, 
    method: 'GET'
   });   


//退出登陆
export const reqLogOut= () => requests({
    url: `/user/passport/logout`, 
    method: 'GET'
   });   

 //获取用户地址信息
export const reqAddressInfo= () => requests({
    url: `/user/userAddress/auth/findUserAddressList`, 
    method: 'GET'
   });   

 //获取用户订单信息
export const reqOrderInfo= () => requests({
    url: `/order/auth/trade`, 
    method: 'GET'
   });     

 //提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data:data,    //传对象用body方式，不用query
    method:'POST',
})  

//获取支付信息
export const reqPayInfo=(orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'GET',
})  

//获取支付状态
export const reqPayStatus=(orderId)=>requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'GET',
})  