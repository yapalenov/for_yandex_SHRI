const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: './src/scripts/bundle.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public/scripts/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {presets: ['es2015']}
                }]
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                exclude: [/node_modules/],
                loader: 'url-loader?limit=1000000'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};