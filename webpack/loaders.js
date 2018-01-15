const path = require('path');
const constants = require('./constants');
// 分离样式文件插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const jsx = {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules|bower_components)/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        'env',
        'stage-0',
        'react',
      ],
      plugins: [
        'transform-runtime',
        'react-hot-loader/babel',
        ['import', {
          libraryName: 'antd-mobile',
          libraryDirectory: 'lib',
          style: 'css',
        }],
      ],
    },
  }],
};

const antdStyle = {
  test: /\.(css|less)$/,
  include: [
    /node_modules\/.*antd-mobile\/.*/,
    /node_modules\\.*antd-mobile\\.*/,
    /node_modules\/.*normalize\.css\/.*/,
    /node_modules\\.*normalize\.css\\.*/,
  ],
  use: constants.ISDEV ?
    [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'less-loader',
    ]
    :
    ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 3,
            localIdentName: '[local]',
          },
        },
        {
          loader: path.resolve(__dirname, 'less-css-modules-assets-fix-loader.js')
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('postcss-pxtorem')({
                rootValue: 100, //根元素的字体大小
                unitPrecision: 5, //允许REM单位增长到的十进制数字
                propList: ['*'], //可以从px更改为rem的属性
                // selectorBlackList: [/^p/],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 2,
              }),
            ]
          }
        },
        {
          loader: 'less-loader'
        }
      ]
    })
};

const less = {
  // 当前项目的less文件，启用CSS modules
  test: /\.less$/,
  include: [
    constants.SRC_DIR,
    constants.COM_DIR,
  ],
  exclude: [
    constants.NODE_MODULES_DIR,
  ],
  use: constants.ISDEV ?
    [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 3,
          //localIdentName: '[path][name]-[local]-[hash:base64:5]',
          localIdentName: '[local]'
        }
      },
      {
        // 这是一个自定义的loader，是为了解决less-loader在启用模块化时无法正确解析到在less文件中引用的外部地址的问题。请参考less-loader的这个issue。
        // https://github.com/webpack-contrib/less-loader/issues/109
        loader: path.resolve(__dirname, 'less-css-modules-assets-fix-loader.js')
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer'),
            require('postcss-pxtorem')({
              rootValue: 100, //根元素的字体大小
              unitPrecision: 5, //允许REM单位增长到的十进制数字
              propList: ['*'], //可以从px更改为rem的属性
              // selectorBlackList: [/^p/],
              selectorBlackList: [],
              replace: true,
              mediaQuery: false,
              minPixelValue: 2,
            }),
          ]
        }
      },
      {
        loader: 'less-loader'
      }
    ]
    :
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 3,
            localIdentName: '[local]'
          }
        },
        {
          loader: path.resolve(__dirname, 'less-css-modules-assets-fix-loader.js')
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer'),
              require('postcss-pxtorem')({
                rootValue: 100, //根元素的字体大小
                unitPrecision: 5, //允许REM单位增长到的十进制数字
                propList: ['*'], //可以从px更改为rem的属性
                // selectorBlackList: [/^p/],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 2,
              }),
            ]
          }
        },
        {
          loader: 'less-loader'
        }
      ]
    })
};

const css = {
  //test: /\.css$/,
  // 不带 -custom 结尾的样式文件，让webpack调用css-loader和style-loader默认处理
  test: /^((?!(-custom)).)*\.css$/,
  include: [
    constants.SRC_DIR,
    constants.COM_DIR,
  ],
  exclude: [
    constants.NODE_MODULES_DIR,
  ],
  use: constants.ISDEV ?
    ['css-hot-loader'].concat(ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer'),
              require('postcss-pxtorem')({
                rootValue: 100, //根元素的字体大小
                unitPrecision: 5, //允许REM单位增长到的十进制数字
                propList: ['*'], //可以从px更改为rem的属性
                // selectorBlackList: [/^p/],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 2,
              }),
            ],
          },
        },
      ],
    }))
    :
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer'),
              require('postcss-pxtorem')({
                rootValue: 100, //根元素的字体大小
                unitPrecision: 5, //允许REM单位增长到的十进制数字
                propList: ['*'], //可以从px更改为rem的属性
                // selectorBlackList: [/^p/],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 2,
              }),
            ]
          }
        }
      ]
    })
};

const cssCustom = {
  // 带 -custom 结尾的样式文件使用 css-loader 的启用了模块化处理，能够在js中以对象的方式应用css样式
  test: /-custom\.css$/,
  include: [
    constants.SRC_DIR,
    constants.COM_DIR,
  ],
  exclude: [
    constants.NODE_MODULES_DIR,
  ],
  use: constants.ISDEV ?
    ['css-hot-loader'].concat(ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer'),
              require('postcss-pxtorem')({
                rootValue: 100, //根元素的字体大小
                unitPrecision: 5, //允许REM单位增长到的十进制数字
                propList: ['*'], //可以从px更改为rem的属性
                // selectorBlackList: [/^p/],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 2,
              }),
            ]
          }
        }
      ]
    }))
    :
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer'),
              require('postcss-pxtorem')({
                rootValue: 100, //根元素的字体大小
                unitPrecision: 5, //允许REM单位增长到的十进制数字
                propList: ['*'], //可以从px更改为rem的属性
                // selectorBlackList: [/^p/],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 2,
              }),
            ]
          }
        }
      ]
    })
};

const woff = {
  test: /\.woff(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff'
};

const woff2 = {
  test: /\.woff2(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff2'
};

const otf = {
  test: /\.otf(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=font/opentype'
};

const ttf = {
  test: /\.ttf(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/octet-stream'
};

const eot = {
  test: /\.eot(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]'
};

const assets = {
  test: /\.(jpe?g|png|gif)$/i,
  include: [
    path.join(constants.ASSETS_DIR, 'images'),
    /node_modules\/.*antd-mobile\/.*/,
    /node_modules\\.*antd-mobile\\.*/,
  ],
  use: ['url-loader?limit=5000!img-loader?progressive=true'],
};

const svg = {
  test: /\.(svg)$/i,
  include: [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
    path.join(constants.ASSETS_DIR, 'svg'),
  ],
  use: [
    'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=image/svg+xml',
    'svg-sprite-loader',
  ]
};

module.exports = {
  jsx: jsx,
  antdStyle: antdStyle,
  less: less,
  css: css,
  cssCustom: cssCustom,
  woff: woff,
  woff2: woff2,
  otf: otf,
  ttf: ttf,
  eot: eot,
  assets: assets,
  svg: svg,
};
