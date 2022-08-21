const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/** @type {import('webpack').Configuration} */

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[contenthash].js',
        assetModuleFilename: './assets/images/[hash][ext][query]'
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
        alias: {
            '@assets': path.resolve(__dirname, './src/assets/'),
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@styles': path.resolve(__dirname, './src/styles/'),
            '@templates': path.resolve(__dirname, './src/templates/'),
            '@utils': path.resolve(__dirname, './src/utils/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css|\.styl$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'assets/fonts/[name][ext][query]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: './public/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
          }),
        new DotEnv(),
        new BundleAnalyzerPlugin(),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 5500,
    }
}
    
