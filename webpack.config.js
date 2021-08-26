const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: [path.resolve(__dirname, 'src', 'app', 'index.tsx')],
	stats: {
		colors: true,
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.json', '.messages'],
		alias: {
			'~': path.resolve('src/app'),
			assets: path.resolve('assets'),
		},
	},
	output: {
		filename: 'app/index.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				loader: 'babel-loader',
				exclude: [/node_modules/, /\.test\.ts?$/],
			},
			{
				test: /\.(css)$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(eot|otf|woff|woff2|png|jpg|jpeg|gif|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'react-svg-loader',
						options: {
							jsx: true, // true outputs JSX tags
						},
					},
				],
			},
		],
	},
	plugins: [
		new webpack.ExternalsPlugin('commonjs', ['electron']),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new CopyWebpackPlugin({
			patterns: [
				{
					context: 'src/',
					from: '**',
					globOptions: {
						dot: true,
						gitignore: true,
						ignore: ['**/*.ts', '**/*.tsx'],
					},
				},
			],
		}),
	],
}
