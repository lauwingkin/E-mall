import axios from 'axios'
import nprogress from 'nprogress';

import "nprogress/nprogress.css";

import store from '@/store'   //引入仓库数据

const requests = axios.create({
    baseURL:"/api",
    timeout:5000,

})


//请求拦截器
requests.interceptors.request.use(config=>{

    if(store.state.detail.uuid_token){   //uuid读取判断
        config.headers.userTempId = store.state.detail.uuid_token
    }

    if(store.state.user.token){   //token读取判断
        config.headers.token = store.state.user.token
        console.log("已通过请求头发送本地存储的token")
    }


        //开启进度条
     nprogress.start();
    return config;   //配置对象，里面的headers很重要
})

//响应拦截器
requests.interceptors.response.use((res)=>{    
    //成功回调
        //响应成功，关闭进度条
        nprogress.done()
    return res.data;
},(error)=>{    //失败回调
    console.log(error)
    return Promise.reject(new Error('fail'));
})


export default requests;