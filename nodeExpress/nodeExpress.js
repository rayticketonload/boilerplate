const express = require('express');
const app = express();

// 关于 connect-history-api-fallback 的作用及配置，参考 http://www.chardlau.com/2017/05/02/usage-of-react-router/
app.use('/', require('connect-history-api-fallback')());
app.use('/', express.static('dist'));

// 脚手架常量配置
const constants = require('../webpack/constants');

// 根据 process.env.NODE_ENV 判断是否是生产环境构建代码，否则需要运行时打包及热更新
if (constants.ISDEV) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack/webpack.config.js');
  const webpackCompiled = webpack(webpackConfig);
  // 运行时打包
  const webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(webpackCompiled, {
    publicPath: "/",
    stats: { colors: true },
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
  }));
  // 配置热更新
  const webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(webpackCompiled));
}

const server = app.listen(constants.PORT, function () {
  const port = constants.PORT;
  console.log(`http://${constants.HOST}:%s`, port);
});