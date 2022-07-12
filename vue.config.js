module.exports = {
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_CROSS_ORIGIN,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  css: {
    // additionalData: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/common.scss";'
      }
    }
  }
}
