const path = require('path');
const webpack = require('webpack');

// 动态命名导出文件
// 需要在index.html中手动引入指定名称的JS文件和CSS文件。一方面这样做比较烦，另一方面对发布和更新不利（缓存导致的各种问题）。
// 这里使用HtmlWebpackPlugin插件解决这个问题。
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// 脚手架常量配置
const constants = require('./constants');

exports.commonPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || "development"),
    },
  }),

  new HtmlWebpackPlugin({
    title: constants.ISDEV ? 'dev' : '金玥',
    description: 'xxxxxxxx',
    keywords: 'xxx,xxxx,xxx',
    template: path.join(constants.SRC_DIR, 'entry.html'),
    style: [
      // 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.7/css/swiper.min.css',
    ],
    js: constants.ISDEV ?
      [
        // weinre 真机调试脚本
        `http://${constants.HOST}:7000/target/target-script-min.js#anonymous`,
        'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.7/js/swiper.min.js',
      ]
      :
      [
        'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.7/js/swiper.min.js',
      ]
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: !constants.ISDEV,
    debug: constants.ISDEV,
  }),

  new OpenBrowserPlugin({
    url: ['http://', constants.HOST, ':', constants.PORT, '/'].join('')
  }),

  // 分离样式文件，样式将输出到styles.[contenthash].css
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css'
  }),

  // 第一个 CommonsChunkPlugin 分离第三方库，例如 JQ
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      // 对其他第三方依赖也要在这里进行代码分割
      return module.context && module.context.indexOf('jquery') !== -1;
    }
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'common'
  })
];

exports.devPlugins = [
  // 关于热更新
  new webpack.HotModuleReplacementPlugin(),
  // 打包时先清掉旧的 dist 文件
  new CleanWebpackPlugin(['dist'], {
    root: constants.ABSOLUTE_BASE,
    verbose: true,
  }),
  new webpack.NamedModulesPlugin(),
  // 可以保证出错时页面不阻塞，且会在编译结束后报错
  new webpack.NoEmitOnErrorsPlugin(),
];

exports.prodPlugins = [
  // 打包时先清掉旧的 dist 文件
  new CleanWebpackPlugin(['dist'], {
    root: constants.ABSOLUTE_BASE,
    verbose: true,
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }),
];
