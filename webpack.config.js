const {HotModuleReplacementPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {resolve} = require('path');

//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

const HOST = '0.0.0.0';
const PORT = 3000;

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {};
module.exports = config;

config.resolve = {
  extensions: ['', '.js'],
  modules: [resolve('.'), 'node_modules'],
};

config.plugins = [new Dotenv()];

//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    main: ['./src/index.js'],
  };

  config.output = {
    filename: '[name].js',
    path: resolve('./target'),
    publicPath: './',
  };

  config.plugins.push(
    new HtmlWebpackPlugin({
      chunkSortMode: 'dependency',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: resolve('./public/index.html'),
      favicon: './public/favicon.ico',
      manifest: './public/manifest.json',
    })
  );
}

//=====================================
//  DEVELOPMENT
//-------------------------------------
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.entry.main.unshift(
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    'core-js/stable',
    'regenerator-runtime/runtime'
  );

  config.module = {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {presets: [['@babel/preset-env', {targets: 'defaults'}]]},
        },
      },
    ],
  };

  config.plugins.push(new HotModuleReplacementPlugin());

  config.devServer = {
    static: {
      directory: './src',
    },
    historyApiFallback: true,
    host: HOST,
    hot: true,
    port: PORT,
    devMiddleware: {
      publicPath: config.output.publicPath,
      stats: {
        cached: true,
        cachedAssets: true,
        chunks: true,
        chunkModules: false,
        colors: true,
        hash: false,
        reasons: true,
        timings: true,
        version: false,
      },
    },
  };
}

//=====================================
//  PRODUCTION
//-------------------------------------
if (ENV_PRODUCTION) {
  config.devtool = 'source-map';

  config.entry.vendor = './src/vendor.js';

  config.output.filename = '[name].[contenthash].js';

  config.module = {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {presets: [['@babel/preset-env', {targets: 'defaults'}]]},
        },
      },
    ],
  };

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          minChunks: Infinity,
        },
      },
    },
  };
}

//=====================================
//  TEST
//-------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';

  config.module = {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {presets: [['@babel/preset-env', {targets: 'defaults'}]]},
        },
      },
    ],
  };
}
