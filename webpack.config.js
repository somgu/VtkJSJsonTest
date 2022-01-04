const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const {
    dir,
    OUTPUT_DIR,
    assets,
} = require('./helpers');

const config = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|pages)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: { import: true },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|json)$/i,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
              },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './dist/index.html'}),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [...assets],
        })
    ],
};

