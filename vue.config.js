const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,

  devServer:{
    // inline: true,
    // // development server port 8000
    // port: 8001,

        //代理服务器解决跨域
        proxy: {
            //会把请求路径中的/api换为后面的代理服务器
            '/api': {
                //提供数据的服务器地址
                target: 'http://gmall-h5-api.atguigu.cn',

            }
        },
    }

})
