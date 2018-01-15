const path = require('path');
const webpack = require('webpack');
// 脚手架常量配置
const constants = require('./constants');
const loaders = require('./loaders');
const plugins = require('./plugins');

const webpackConfig = {
  devtool: constants.ISDEV ? 'cheap-module-eval-source-map' : 'hidden-source-map',

  // 配置上下文到项目配置文件目录，这样可以使用相对根目录的路径访问其他文件
  context: constants.SRC_DIR,

  entry: {
    app: constants.ISDEV ?
      [
        // 开发环境打包规则
        'react-hot-loader/patch',

        // 不用 webpack-dev-server 的时候
        // `webpack-hot-middleware/client?path=http://${constants.HOST}:${constants.PORT}/__webpack_hmr&timeout=10000&reload=true`,

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        `webpack-dev-server/client?http://${constants.HOST}:${constants.PORT}`,
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',
        path.join(constants.SRC_DIR, 'entry.js'),
      ] : [
        // 生产环境打包规则
        path.join(constants.SRC_DIR, 'entry.js'),
      ],
  },

  output: {
    filename: constants.ISDEV ? '[name]_[hash].js' : '[name]_[chunkhash].js',
    path: constants.DIST_DIR,
    publicPath: '/',
  },

  module: {
    rules: [
      loaders.jsx,
      loaders.antdStyle,
      loaders.less,
      loaders.css,
      loaders.cssCustom,
      loaders.woff,
      loaders.woff2,
      loaders.otf,
      loaders.ttf,
      loaders.eot,
      loaders.assets,
      loaders.svg,
    ],
  },

  plugins: constants.ISDEV ?
    [].concat(plugins.commonPlugins, plugins.devPlugins)
    :
    [].concat(plugins.commonPlugins, plugins.prodPlugins),

  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.web.js', '.js', '.css', '.less', '.json'],
    alias: {
      // 自定义路径别名，大写用于区别NPM模块
      ASSETS: path.join(constants.SRC_DIR, 'assets'),
      SVG: path.join(constants.SRC_DIR, 'assets/svg'),
      PAGES: path.join(constants.SRC_DIR, 'pages'),
      COM: path.join(constants.SRC_DIR, 'components'),
      UTILS: path.join(constants.SRC_DIR, 'utils'),
    },
  },
};

module.exports = webpackConfig;
