module.exports = {
	entry: './src/Router.jsx',
	output: {
		path: __dirname + '/static',
		filename: 'router.bundle.js'
	},
	module: {
		rules: [
		  {
			test: /\.jsx$/,
			loader: 'babel-loader',
			query: {
				presets: ['react']
			}
		  },
		  {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		  },
		  {
			 test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
			 loader: 'url-loader?limit=100000'
		  }
		]
	}
};