const paths = require('./config').paths;
const IS_PRODUCTION = require('./config').IS_PRODUCTION;

const devServer = {
  contentBase: IS_PRODUCTION ? paths.build : paths.source,
  historyApiFallback: true,
  port: 3000,
  compress: IS_PRODUCTION,
  proxy: {
    '/api': {
      target: IS_PRODUCTION ? 'http://159.65.67.170' : 'http://127.0.0.1:19001',
      secure: true
    },
    '/imagesapi': {
      target: IS_PRODUCTION ? 'http://159.65.67.170' : 'http://127.0.0.1:19001',
      secure: true
    }
  },
  inline: !IS_PRODUCTION,
  hot: !IS_PRODUCTION,
  host: '0.0.0.0',
  disableHostCheck: true, // To enable local network testing
  overlay: true,
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: true,
  },
};

module.exports = {
  devServer,
};
