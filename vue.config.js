const { defineConfig } = require('@vue/cli-service')
var webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack:{
    plugins: [
      new webpack.ProvidePlugin({
        $:'jquery',
        jQuery:"jquery",
        "windows.jQuery":'jquery'
      })
    ],
  }
  
  // 配置代理跨域  留给后面有自己写api用
  // devServer:{
  //   proxy:{
  //     "/api":{
  //       target:"http://gmall-h5-api.atguigu.cn",
  //     },
  //   }
  // }
})
