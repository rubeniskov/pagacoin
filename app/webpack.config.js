const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack')

const proxyHost = process.env.PAGANTIS_API || 'localhost:8080';

module.exports = () => ({
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  entry: "./src/App.tsx",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  stats: { errorDetails: true },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    fallback: {
      "process": require.resolve("process/browser"),
    }
  },
  module: {
    rules: [{
      test: /(\.tsx?|node_modules\/react-router-native\/.*js)$/,
      use: {
        loader: 'babel-loader'
      }
    },  {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'url-loader',
        },
      ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      }],
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: ['process'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 9966,
    historyApiFallback: true,
    proxy: {
      "/api": {
        changeOrigin: true,
        cookieDomainRewrite: proxyHost.split(':')[0],
        target: `http://${proxyHost}/`,
        pathRewrite: { '^/api': '' },
      },
    }
  }
})
