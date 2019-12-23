const path = require('path');

module.exports = {
    entry: [
        './src/app/index.js',
    ],
    output: {
        filename: './dist/bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }
            },
        ]
    },
    plugins: []
};
