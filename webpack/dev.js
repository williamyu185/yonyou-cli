var webpack = require('webpack');
var config = require('./base.js');
var WebpackDevServer = require('webpack-dev-server');
config.entry.context.unshift('webpack-dev-server/client?http://test.chaoke.com:9000/');
var compiler = webpack(config);
new WebpackDevServer(compiler, {
    //每次都打开一个网页
    open: true,
    host: 'test.chaoke.com',
    //不在控制台打印任何 log
    quiet: false,
    disableHostCheck: true,
    //打包状态信息输出配置
    stats: {
        colors: true
    },
    //把请求代理到一个外部的服务器
    // proxy: {
    //     // 正则表达式匹配/login,然后 匹配到 转向target设置的目标接口,请求数据时服务器端对接口进行了重定向
    //     '/login': {
    //         target: 'https://pc-api.upesn.com',
    //         //是否验证SSl证书
    //         secure: false,
    //         //如果设置为true,那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了
    //         changeOrigin: true
    //     },
    // },
    //启用webpack的Hot Module Replacement特性  --不生效
    // hot: true,
    //模块热替换
    inline: true,
    //只会对可以热更新的部分进行热更新  --不生效
    // hotOnly: true,
    //对所有请求启用gzip压缩
    compress: true,
    //运行命令之后自动打开浏览器  只可以使用控制台 package.json scripts
    // open: true,
    //将运行进度输出到控制台，只可以使用控制台 package.json scripts
    // progress: false,
    // 使用颜色，有利于找出关键信息，只能在控制台中使用 package.json scripts
    // color: false,
    //对外服务的内容来源，只有在提供静态文件访问的情况下才需要使用该配置
    publicPath: 'http://test.chaoke.com:9000/',
    //对外提供的访问内容的路径
    contentBase: '../dist',
    ////让所有404的页面定位到index.html
    historyApiFallback: true,
    watchOptions: {
        // 当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。
        aggregateTimeout: 2000,
        // 排除一些巨大的文件夹
        ignored: /node_modules/
    }
}).listen(9000);
