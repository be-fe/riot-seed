var webpack = require('webpack');

module.exports = {
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            // { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" },
            { test: require.resolve("riot"), loader: "expose?$!expose?riot" },
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