const merge = require('webpack-merge');
const devConfig = require('./webpack/dev.config');
const baseConfig = require('./webpack/base.conifg');
module.exports = env => {

  if(env.dev) {
    return merge(devConfig, baseConfig(env));
  }

  return baseConfig(env);
}