'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //每次构建清理dist目录

const nodeEnv = process.env.NODE_ENV || 'development';
const appDirectory = path.join(fs.realpathSync(process.cwd()), './');
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: nodeEnv,
  devtool: 'source-map',
  entry: {
    index: [resolveApp('src/index.ts')]
  },
  output: {
    path: resolveApp('dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'columbusMagicUrl',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.d.ts'],
  },
  optimization: {
    minimize: nodeEnv === 'production',
    minimizer: [
      new TerserPlugin({ // Only used in production mode
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          },
        },
        parallel: true,
        cache: true,
        sourceMap: false
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: process.env.NODE_ENV })
    }),
    ...(nodeEnv === 'development' ? [new webpack.HotModuleReplacementPlugin()] : []),
    ...(nodeEnv === 'production' ? [new CleanWebpackPlugin(['dist'])] : [])
  ],
  devServer: {
    contentBase: resolveApp('example'),
    hot: true,
    port: 8183,
    inline: true
    // host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        exclude: /node_modules/,
        include: [resolveApp('src')],
        loader: require.resolve('eslint-loader'),
        options: {
          eslintPath: require.resolve('eslint')
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        include: [resolveApp('src')],
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-typescript')],
          plugins: [
            require.resolve('@babel/plugin-transform-runtime'),
            require.resolve('@babel/plugin-proposal-class-properties'),
            require.resolve('@babel/plugin-proposal-object-rest-spread')
          ],
          cacheDirectory: true,
          cacheCompression: nodeEnv === 'production',
          compact: nodeEnv === 'production'
        },
      }
    ]
  }
}
