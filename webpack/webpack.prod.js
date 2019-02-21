const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
	mode: 'production',
	output: {
		filename: `${commonPaths.jsFolder}/[name].[hash].js`,
		path: commonPaths.outputPath,
		chunkFilename: '[name].[chunkhash].js',
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
							modules: true,
							camelCase: true,
							localIdentName: '[local]___[hash:base64:5]',
						},
					},
					'sass-loader',
				],
			},
		],
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				extractComments: 'all',
				cache: true,
				parallel: true,
				sourceMap: false,
				uglifyOptions: {
					warnings: false,
					mangle: true,
					toplevel: false,
					ie8: true,
					keep_fnames: false,
					compress: {
						drop_console: true,
					},
					output: {
						comments: false,
					},
				},
			}),
		],
	},
	plugins: [
		new CleanWebpackPlugin([commonPaths.outputPath.split('/').pop()], {
			root: commonPaths.root,
		}),
		new MiniCssExtractPlugin({
			filename: `${commonPaths.cssFolder}/[name].css`,
			chunkFilename: '[id].css',
		}),
	],
};
