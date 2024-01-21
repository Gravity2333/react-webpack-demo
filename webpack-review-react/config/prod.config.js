const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const {optimize: {ModuleConcatenationPlugin}} = require('webpack')
const AutoUploadWebpackPlugin = require('../plugins/auto-upload-webpack-plugin')

module.exports = {
    /** production模式下配置 */
    mode: 'production',
    devtool: false,
    plugins: [
        // 生产环境下拷贝public目录文件到build文件夹
        new CopyWebpackPlugin({
            patterns: [{
                from: './public',
                to: './'
            }]
        }),
        // 自动上传到树莓派服务器
        new AutoUploadWebpackPlugin({
            host: '192.168.31.211',
            username: 'liuze',
            password: 'liuze22331144',
            serverDir: '/var/www/html/'
        })
    ],
    externals: {},
    optimization: {
        chunkIds: 'deterministic',
        splitChunks: {
            chunks: 'all',
            // maxSize: 200 * 1024,
            minSize:2,
            cacheGroups: {
                vendor: {
                    test: /[\\/node_modules[\\/]]/,
                    filename: "[name]-[chunkhash:8].js"
                }
            }
        },
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: true,
                terserOptions: {
                    compress: {
                        arrows: true,
                        arguments: true,
                        dead_code: true
                    },
                    mangle: {
                        toplevel: true
                    }
                }
            }),
            new CssMinimizerWebpackPlugin(),
            new CompressionWebpackPlugin({
                minRatio: 0.7,
                algorithm: 'gzip',
                test: /\.(js|css)$/
            }),
            new ModuleConcatenationPlugin({
                parallel: true
            })
        ]
    }
}