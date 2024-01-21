const path = require('path')
const { merge } = require('webpack-merge')
const devConfig = require('./dev.config.js')
const prodConfig = require('./prod.config.js')
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const commonConfig = (isProduction = false) => {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'js/[name]-[chunkhash:8].bundle.js',
            publicPath: '',
            clean: true,
            assetModuleFilename: "asset/[name]-[hash:8].asset[ext]",
            // 动态js文件名称
            chunkFilename: "js/[name]-[chunkhash:8].bundle.async.js"
        },
        resolve: {
            extensions: ['.jsx', '.tsx', '.js', '.ts'],
            mainFiles: ['index'],
            alias: {
                'utils': path.resolve(__dirname, '../src/utils'),
                '@': path.resolve(__dirname, '../src/')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css/,
                    use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
                },
                {
                    test: /\.less/,
                    use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader']
                },
                {
                    test: /\.(jpe?g|png|svg|gif)/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 20 * 1024
                        }
                    }
                }
            ]
        },
        plugins: [
            ...isProduction?[new MiniCssExtractPlugin({
                filename: 'css/[name]-[contenthash:8].css',
                chunkFilename: 'css/[name]-[contenthash:8].async.css',
            })]:[],
            new HtmlWebpackPlugin({
                inject: 'body',
                minify: 'auto',
                template: './template.html',
                filename: 'index.html',
            }),

        ]
    }
}

module.exports = (env) => {
    const isProduction = env.production
    console.log(merge(commonConfig(isProduction), isProduction ? prodConfig : devConfig))
    return new SpeedMeasureWebpackPlugin().wrap(merge(commonConfig(isProduction), isProduction ? prodConfig : devConfig))
    // 
    // return merge(commonConfig(isProduction), isProduction ? prodConfig : devConfig)
}
