const path = require('paht');

modules.exports = {
    entry: 'app.js',
    output: {
        path: path.resolve(__dirname,'dist'),//生产环境
        filename: 'app.bundle.js'
    },
    scripts: {
        start: 'webpack',
        dev: 'node dev-server.js'
    }
}