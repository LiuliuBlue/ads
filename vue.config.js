const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: '8888',
    host: 'localhost',
    proxy: {
      [process.env.VUE_APP_API]: {
        target: process.env.VUE_APP_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_API]: ''
        }
      }
    }
  }
})
