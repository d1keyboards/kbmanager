const webpack = require('webpack')
const { merge } = require('webpack-merge')

const DEFAULTS = require('./webpack.config')

module.exports = merge(DEFAULTS, {
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: true,
			'process.env': 'development',
		}),
	],
})
