const path = require('path');

module.exports = {
    entry: 'app.js',
    output: {
        path: path.resolve(__dirname,'dist'),//生产环境
        filename: 'app.bundle.js'
    },
    module: {
	    rules: [
	      	{ test: /\.txt$/, use: 'raw-loader' }
	    ]
	}
}