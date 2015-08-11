//config for webpack build
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = __dirname + '/node_modules';

var config = module.exports = {
	//set context for rails asset pipeline
	context: __dirname + '/webpack/javascripts', //project directory
	addVendor: function (name, path) {
		this.resolve.alias[name] = path;
		this.module.noParse.push(new RegExp('^' + name + '$'));
	},
	entry: [
		'./entry.js' //app entry point from context
	],
	resolve: {
		alias: {},
		extensions: ["", ".js", ".jsx"]
	},
	module: {
		noParse: [],
		loaders: [
			//load jsx hot
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
			{ test: require.resolve('jquery'), loaders: ['expose?jQuery', 'expose?$'] },
			{ test: /\.scss$/, loader: "style!css!sass" },
			{ test: /\.css$/, loader: "style!css" },
			{ test: /\.(gif|jpg)$/, loader: "url" },
			{ test: require.resolve('zurb-foundation'), loader: 'expose?foundation' }  
		]
	}
};

//output our bundle to the path where sprockets pipeline will include it
config.output = {
	path: path.join(__dirname, 'app', 'assets', 'javascripts'),
	filename: 'webpack-bundle.js'
};

config.addVendor('react/addons', node_modules_dir + '/react/dist/react-with-addons.min.js');
config.addVendor('react', node_modules_dir + '/react/dist/react-with-addons.min.js');