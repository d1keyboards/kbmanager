const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const DEFAULTS = require('./webpack.config')
const { version } = require('./dist/version.json')

module.exports = merge(DEFAULTS, {
	mode: 'production',
	optimization: {
		emitOnErrors: false,
		minimize: true,
		minimizer: [`...`, new CssMinimizerPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.(css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
		new webpack.DefinePlugin({
			__DEV__: false,
			'process.env': 'production',
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
	],
})
