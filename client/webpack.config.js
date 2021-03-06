const path = require('path')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const buildPath = path.resolve(__dirname, 'dist')
const srcPath = path.resolve(__dirname, 'src')

const isProd = process.env.NODE_ENV === 'production'

const getSettingsForStyles = (withModules = false) => {
	return [
		MiniCssExtractPlugin.loader,
		!withModules
			? 'css-loader'
			: {
					loader: 'css-loader',
					options: {
						modules: {
							localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
						},
					},
			  },
		'sass-loader',
	]
}

module.exports = {
	entry: path.resolve(__dirname, './src/index.tsx'),
	target: !isProd ? 'web' : 'browserslist',
	devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
	output: {
		path: buildPath,
		filename: 'bundle.js',
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
		}),
		!isProd && new ReactRefreshWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name]-[hash].css',
		}),
		new TsCheckerPlugin(),
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.module\.s?css$/,
				use: getSettingsForStyles(true),
			},
			{
				test: /\.s?css$/,
				exclude: /\.module\.s?.css$/,
				use: getSettingsForStyles(),
			},
			{
				test: /\.([tj])sx?$/,
				use: 'babel-loader',
			},
			{
				test: /\.(png|svg|jpg)$/,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts'],
		alias: {
			'@components': path.resolve(srcPath, 'components'),
			'@styles': path.resolve(srcPath, 'styles'),
			'@assets': path.resolve(srcPath, 'assets'),
			'@hooks': path.resolve(srcPath, 'hooks'),
			'@store': path.resolve(srcPath, 'store'),
			'@context': path.resolve(srcPath, 'context'),
		},
	},
	devServer: {
		host: 'localhost',
		port: 3000,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
			},
		},
	},
}
