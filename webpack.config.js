var path = require('path');
var webpack = require('webpack');

var autoprefixer = require('autoprefixer');

module.exports = {
    devServer: {
        proxy: {
            "/api/*": {
                target: "https://cnodejs.org",
                secure: false
            }
        },
        // hot: true,
        // inline: true
    },
    entry: [
        // 'webpack-dev-server/client?http://localhost:8888', // 这两行相当于 --inline --hot
        // 'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: path.resolve(__dirname, 'src/styles'),
                loader: 'style-loader!css-loader?modules!postcss-loader!sass-loader'
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/styles'),
                loader: 'style!css'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
    ],
    postcss: [autoprefixer]
};
