const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    plugins: [
        new HtmlWebpackPlugin({
            title: 'AG Grid Mail Blog',
            template: 'index.html'
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
};