
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