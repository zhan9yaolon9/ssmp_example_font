const { defineConfig } = require('@vue/cli-service')
module.exports = {
  /*
    *是否开启eslint验证
      false：关闭每次保存都进行检测
      true：开启每次保存都进行检测，效果与warning一样
      warning：开启每次保存都进行检测，lint 错误将显示到控制台命令行，而且编译并不会失败。
      error：开启每次保存都进行检测，lint 错误将显示到浏览器页面上，且编译失败。
      default’：同’error’
  */
  lintOnSave:false,
  devServer: {
    //代理接口配置
    proxy: {
        '/api': { //代理标识，区分代理接口和后端接口
          target: 'http://localhost',//指向controller后端接口实际地址
          changeOrigin: true, // 允许跨域
          pathRewrite: {'^/api': ''}, //后端接收的地址不包含/api，而为空
        }
      }
  }
}
