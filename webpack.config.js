var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'eval',
    entry: [
        './src/app.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
		publicPath: "/assets/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
			//{ test: /\.json$/, loader: 'json' },
			/*{
				test: /\.json$/,
				loader: 'json-loader'
			},*/
            {
				test: /\.json$/,
				loader: 'raw-loader'
            },
            /*{
				test: /\.json$/,
				loader: 'file-loader'
            },*/
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
				test: /\.jsx?/,
				loaders: ['babel'],
				include: path.join(__dirname, 'src')
            }
        ]
    }
}