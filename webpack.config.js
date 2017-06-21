const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
module.exports = function(env) {
	return {
		context: __dirname,
		entry: './index.js',
		output: {
			filename: "[name].[hash].js",
			path: path.join(__dirname, 'dist'),
			publicPath: '/'
		},
		resolve: {
			extensions: ['.js', 'json', '.jsx'],
			alias: {
				'@': path.join(__dirname, 'src')
			}
		},
		module: {
			rules: [
			{
				test: /\.js[x]?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},

			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.join(__dirname, 'src/images/[name].[hash:7].[ext]')
				}
			},

			{
				test: /\.(woff2?|eot|ttf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.join(__dirname, 'src/fonts/[name].[hash:7].[ext]')
				}
			},

			{
				test: /\.less/,
				loader: 'lcss-loader',
				options: {
					minimize: true,
					sourceMap: true
				}
			}


			]
		},

		devtool: '#source-map',

		plugins: [
			// new webpack.optimize.UglifyJsPlugin({
			// 	//compress: //env.production
			// }),

			new webpack.HotModuleReplacementPlugin(),

			new webpack.NoEmitOnErrorsPlugin(),

			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'index.html',
				favicon: path.join(__dirname, 'favicon.ico'),
				inject: true
			}),

			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: function(module, count) {
					return (module.resource
						&& /\.js$/.test(module.resource)
						&& module.resource.indexOf(path.join(__dirname, 'node_modules')) === 0)
				}
			}),

			new webpack.optimize.CommonsChunkPlugin({
				name: 'manifest',
				chunks: ['vendor']
			}),
			new FriendlyErrorsPlugin()
		],

		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			//compress: true,
			port: 9999,
			hot: true
		}
	}
}