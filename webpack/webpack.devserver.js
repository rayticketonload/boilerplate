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
      target: 'http://rap.monster/',
      pathRewrite: {
          '^/api': `/mockjsdata/${constants.PROJECT_ID}/api`
      },
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
