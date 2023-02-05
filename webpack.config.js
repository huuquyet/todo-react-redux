const {LoaderOptionsPlugin, HotModuleReplacementPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
//  LOADERS
//---------------------------------------------------------
const loaders = {
  js: {
    test: /\.m?js$/i,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {presets: [['@babel/preset-env', {targets: 'defaults'}]]},
    },
  },
  scss: {
    test: /\.s[ac]ss$/i,
    use: [
      ENV_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
    ],
  },
};

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {};
module.exports = config;

config.resolve = {
  extensions: ['', '.js'],
  modules: [resolve('.'), 'node_modules'],
};

config.plugins = [
  new Dotenv(),
  new LoaderOptionsPlugin({
    // test: /\.xxx$/, // may apply this only for some modules
    options: {
      sassLoader: {
        outputStyle: 'compressed',
        precision: 10,
        sourceComments: false,
      },
    },
  }),
];

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
    publicPath: '/',
  };

  config.plugins.push(
    new HtmlWebpackPlugin({
      chunkSortMode: 'dependency',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html',
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
    rules: [loaders.js, loaders.scss],
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

  config.entry.vendor = [
    'react',
    'react-dom',
    'react-router-dom',
    'connected-react-router',
    'react-redux',
    '@reduxjs/toolkit',
    'redux-thunk',
    'core-js/stable',
    'regenerator-runtime/runtime',
    'firebase/compat/app',
    'immutable',
    'reselect',
  ];

  config.output.filename = '[name].[contenthash].js';

  config.module = {
    rules: [loaders.js, loaders.scss],
  };

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'styles.[contenthash].css',
    })
  );

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
    rules: [loaders.js, loaders.scss],
  };
}
