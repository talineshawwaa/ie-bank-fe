const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map"
  },
  outputDir: process.env.VUE_APP_ENV_VAR_FILE_NAME === '.env.uat' ? 'dist-uat' :
             process.env.NODE_ENV === 'development' ? 'dist-dev' :
             'dist', // fallback to dist for production
})