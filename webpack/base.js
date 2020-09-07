const webpack = require('webpack');
const path = require('path');
// webpack 4.0 中用来抽离css 的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
// 针对 Lodash 按需打包
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const nodeModules = path.resolve(__dirname, '../node_modules');
const nodeENV = process.env.NODE_ENV;
const isDev = (nodeENV != 'prev' && nodeENV != 'production');
const isLocalServeENV = (nodeENV == 'development');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const projectPath = path.resolve(__dirname, '../');
const sourceCodePath = path.join(projectPath, '/src');
const distExportPath = path.join(projectPath, './dist');
const bundleTime = function() {
	let date = new Date();
	let year = date.getFullYear();
	//获取当前月份的日期
	let mouth = date.getMonth() + 1;
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	let milliseconds = date.getMilliseconds();
	return (year + '-' + mouth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + milliseconds);
};
const cssLoaderMiniCssExtractPluginRule = {
	//将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件
	loader: MiniCssExtractPlugin.loader,
	options: {
		// you can specify a publicPath here
		// by default it use publicPath in webpackOptions.output
		publicPath: '../'
	}
};
const pxToViewport = require('postcss-px-to-viewport');
const pxToViewportConfig = {
			// 要转化的单位
			unitToConvert: "px",
			// UI设计稿的宽度
			viewportWidth: 750, 
			// 转换后的精度，即小数点位数
			unitPrecision: 6,
			// 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
			propList: ["*"],
			// 指定需要转换成的视窗单位，默认vw
			viewportUnit: "vw",
			// 指定字体需要转换成的视窗单位，默认vw
			fontViewportUnit: "vw",
			// 指定不转换为视窗单位的类名，
			selectorBlackList: ["nopxtoviewport"], 
			// 默认值1，小于或等于1px则不进行转换
			minPixelValue: 1,
			// 是否在媒体查询的css代码中也进行转换，默认false
			mediaQuery: false,
			// 是否转换后直接更换属性值
			replace: true,
			// 设置忽略文件，用正则做目录名匹配
			exclude: [/node_modules/],
			// 是否处理横屏情况
			landscape: false 
		};
const postcssLoaderRules = {
	loader: 'postcss-loader',
	options: {
		plugins: [
			// 自动补全css前缀
			require('autoprefixer'),
			// 如果需要开启px转vw插件功能,请取消注释此行代码
			// pxToViewport(pxToViewportConfig)
		],
		// 开启sourceMap调试
		sourceMap: true,
		// 开启css-modules模式下的css-post功能
		modules: true,
	}
};

module.exports = {
    mode: isDev ? 'development' : 'production',
	//打debugger包,实现es6代码与编译后的es5代码行列对应关系
	devtool: isDev ? 'cheap-module-eval-source-map' : 'nosources-source-map',
	entry: {
		context: [path.join(sourceCodePath, '/main.js')]
	},
	output: {
		path: distExportPath,
		filename: '[name].[hash].js',
	},
    performance: {
        //资源(asset)和入口起点超过指定文件限制
        hints: false
    },
	//提取第三方库和公共模块，避免首屏加载的bundle文件或者按需加载的bundle文件体积过大，从而导致加载时间过长
	optimization: {
        //优化持久化缓存的
        // runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单, 模块信息清单在每次有模块变更(hash 变更)时都会变更, 所以我们想把这部分代码单独打包出来
        //告诉 webpack 是否要把这部分单独打包出来.
        runtimeChunk: {
            name: 'manifest'
        },
        // 压缩js代码
		minimizer: [
			new TerserWebpackPlugin({
				parallel: true,
				sourceMap: true,
				terserOptions: {}
			}),
			new CssMinimizerPlugin()
		],
		splitChunks: {
			cacheGroups: {
                // 将多个css chunk合并成一个css文件  项目工程中自定义的公共样式及引入第三方组件的样式
                styles: {
                    name: 'globalPublic',
                    test: /\.css$/,
                    chunks: 'all',
                    //强制生成
                    enforce: true
                },
                //vendor.js中应该包含node_modules公共模块
                vendor: {
                    //缓存组的规则，表示符合条件的的放入当前缓存组
                    test: /node_modules/,
                    chunks: 'all',
                    //重写文件名称
                    name: 'nodeModules',
                    priority: 10,
                    minSize: 0,
                },
			}
		},
	},
	module: {
		rules: [{
				test: /\.vue$/,
				exclude: nodeModules,
				include: sourceCodePath,
				loader: 'vue-loader'
			}, {
				test: /\.js$/,
				exclude: nodeModules,
				include: sourceCodePath,
				use: [
					{
						loader: 'babel-loader',
						options: {
							// 转换规则,根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5
							presets: ['@babel/preset-env'],
							// babel只能转换语法,不能转化es6新增API,babel-polyfill.会将所有es6新增的内置方法添加到原型上,
							// 而@babel/transform-runtime将按需增加要使用的es6方法,且是在模块中通过require引入的,不污染内置对象原型
							plugins: ['@babel/plugin-transform-runtime']
						}
					}
				]
			}, {
				test: /\.(css|less)$/,
				oneOf: [
					// 这里匹配 `<style module>`
					{
						resourceQuery: /module/,
						use: [
							cssLoaderMiniCssExtractPluginRule,
							{
								loader: 'css-loader',
								options: {
									modules: true,
									// localIdentName: '[path][name]__[local]--[hash:base64:5]'
								}
							},
							// 对 CSS 进行各种不同的转换和处理
							postcssLoaderRules,
							'less-loader',
						]
					},
					// 这里匹配普通的 `<style>` 或 `<style scoped>`
					{
					  	use: [
							cssLoaderMiniCssExtractPluginRule,
							'css-loader',
							// 对 CSS 进行各种不同的转换和处理
							postcssLoaderRules,
							'less-loader',
						]
					}
				  ]
			}, {
				test: /\.(gif|jpg|png)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						publicPath: './',
						name: 'images/[name].[hash:8].[ext]'
					}
				}]
			}, {
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: [{
					loader: 'file-loader',
					options: {
						limit: 8192,
						publicPath: './',
						name: 'font/[name].[hash:8].[ext]'
					}
				}]
			}
		],
		noParse: /node_modules\/(jquey|js\-cookie\.js)/
	},
	resolve: {
		//在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
		extensions: ['.vue', '.js', '.json', '.css'],
		//使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
		//其中， dirname 表示当前工作目录，也就是项目根目录
		modules: [
			sourceCodePath,
			nodeModules
		],
		//配置项通过别名来把原导入路径映射成一个新的导入路径
		alias: {
			vue: 'vue/dist/vue.js',
		},
	},
	plugins: [
        //清除文件  类似rm -rf
        // new CleanWebpackPlugin(['dist']),
		//不必通过 import/require 使用模块
		// new webpack.ProvidePlugin({
		// 	jQuery: 'jquery',
		// 	$: 'jquery'
		// }),
		new webpack.DefinePlugin({
			__ENV__: JSON.stringify(nodeENV),
		}),
		//vue-loader插件
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
			},
			favicon: path.join(sourceCodePath, '/asset/ico.ico'),
			template: path.join(sourceCodePath, '/template/index.html'),
			inject: true,
			bundleTime: bundleTime(),
			preventConfigCache: new Date().getTime(),
		}),
		//提取打包，css文件重复打包的问题
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: '[name].css'
		}),
		//打包百分比进度显示
		new ProgressBarPlugin({
			format: chalk.blue.bold('build  ') + chalk.cyan('[:bar]') + chalk.green.bold(':percent') + ' (' + chalk.magenta(':elapsed') + ' seconds) ',
			clear: false
		}),
		//按需打包Lodash,各版本浏览器工具方法兼容
		new LodashModuleReplacementPlugin(),
        //集中拷贝静态资源
        new CopyWebpackPlugin({
			patterns: [{
				//打包的静态资源目录地址
				from: path.resolve(__dirname, '../src/config/configReplace.js'),
				//打包到dist下面的public
				to: '../dist/config.js'
			}]
		}),
	]
};
