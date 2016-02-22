var webpack = require('webpack');

module.exports = {
    entry: "./src/js/boot.js",
    output: {
        //path: './src',
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot',
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    module: {
        // preLoaders: [
        //     { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
        // ],
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { 
                test: /\.js|\.tag$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                } 
            }
        ]
    }
};