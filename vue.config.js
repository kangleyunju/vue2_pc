const { defineConfig } = require('@vue/cli-service')

function resolve(dir) {
	return require('path').join(__dirname, dir)
}
module.exports = defineConfig({
	publicPath: process.env.NODE_ENV == 'pro' ? '/vue2_pc/' : '/', // 基本路径
	outputDir: 'dist', // 构建时的输出目录
	assetsDir: 'static', // 放置静态资源的目录
	indexPath: 'index.html', // html 的输出路径
	filenameHashing: true, // 文件名哈希值
	lintOnSave: false, // 是否在保存的时候使用 `eslint-loader` 进行检查。
	runtimeCompiler: false, //在运行的时候才去编译template
	transpileDependencies: [], // babel-loader 默认会跳过 node_modules 依赖。
	productionSourceMap: false, // 是否为生产环境构建生成 source map
	configureWebpack: {
		performance: {
			hints: 'warning',
			maxEntrypointSize: 50000000, //入口起点的最大体积
			maxAssetSize: 30000000, //生成文件的最大体积
			assetFilter: function(assetFilename) {
				return assetFilename.endsWith('.js') //只给出 js 文件的性能提示
			}
		},
		optimization: {
			nodeEnv: false
		}
	},
	chainWebpack(config) {
		config.module.rules.delete('svg'); //删除默认配置中处理svg
		config.module.rule('svg-sprite-loader').test(/\.svg$/).include.add(resolve('src/assets/svg')).end().use('svg-sprite-loader').loader('svg-sprite-loader').options({
			symbolId: 'icon-[name]'
		})
	}, //调整内部的 webpack 配置
	transpileDependencies: true,
	devServer: {
		open: true,
		port: 8200,
		host: 'localhost',
		proxy: {
			'/pro': {
				target: 'https://www.baidu.com',
				changeOrigin: true,
				pathRewrite: {
					"^/pro": ""
				}
			},
			'/dev': {
				target: 'https://www.yizhibo.com',
				changeOrigin: true,
				pathRewrite: {
					"^/dev": ""
				}
			}
		}
	}
})