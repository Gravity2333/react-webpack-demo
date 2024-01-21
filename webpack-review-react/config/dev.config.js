const { proxy } = require('./proxy')

module.exports = {
    /** development模式下配置 */
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: '8088',
        static: [{
            directory: './public',
            publicPath: ''
        }],
        hot: false,
        open: true,
        proxy,
    }
}