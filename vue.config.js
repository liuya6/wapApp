const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const path = require("path");
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: "/",

  // 生产环境构建文件的目录
  outputDir: "dist",

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "",

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: "index.html",

  configureWebpack: config => {
    config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, "./src/skeleton.js")
          }
        },
        minimize: true,
        quiet: true
      })
    );
    if (process.env.NODE_ENV == "production") {
      config.plugins.push(
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions, //匹配文件名
          threshold: 10240, //对超过10k的数据压缩
          minRatio: 0.8,
          deleteOriginalAssets: false //删除源文件
        })
      );
    }
  },

  chainWebpack: config => {
    // 移除 prefetch 插件 路由懒加载失效的原因
    config.plugins.delete("prefetch");
    // 打包压缩图片
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        bypassOnDebug: true
      })
      .end();
  },

  devServer: {
    host: "0.0.0.0",
    hot: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        // ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        target: "http://m.678678666.com" // target host
        // target: "http://tp.agilephp.com", // target host
        /* 调用线上接口不需要重定向 */
        // pathRewrite: {
        //   "^/api/common": "/common", // rewrite path
        //   "^/api": "/wap" // rewrite path
        // }
      }
    }
  },

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },

  productionSourceMap: false,
  transpileDependencies: ["mint-ui"]
};
