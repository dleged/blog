const path = require('path');
const Ex = require('extract-text-webpack-plugin');
module.exports = {
    entry: 'app.js',
    output: {
        path: path.resolve(__dirname,'dist'),//生产环境
        filename: 'app.bundle.js'
    },
     module: {
      	loaders: [{
        	test: /\.css$/,
        	loader: Ex.extract('style-loader', 'css-loader!postcss-loader') /*这里的写法注意下 */
      	}]
    },
    postcss: function() {
      	return [autoprefixer, cssnext, precss, cssnano]
    },
    plugins: [
      	new Ex("【name】.css")
    ]
}