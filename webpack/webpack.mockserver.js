const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const constants = require('./constants');

new WebpackDevServer(webpack(webpackConfig), {
  contentBase: '/',
  hot: true,
  historyApiFallback: true,
  compress: true,
  proxy: {
    '/api': {
      // 开发环境接口服务，需要配置host 10.1.21.126 ftapp.95039.com
      target: 'http://ftapp.95039.com',
      changeOrigin: true,
      secure: false
    }
  },
  stats: { colors: true }
}).listen(constants.PORT, constants.HOST, function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log(`http://${constants.HOST}:${constants.PORT}/`);
});