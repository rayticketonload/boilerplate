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
    '/api/*': {
      target: 'http://rap2api.taobao.org/',
      pathRewrite: {
        '^/api': `app/mock/${constants.PROJECT_ID}/`,
      },
      changeOrigin: true,
      secure: false,
    },
  },
  stats: { colors: true }
}).listen(constants.PORT, constants.HOST, function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log(`http://${constants.HOST}:${constants.PORT}/`);
});
