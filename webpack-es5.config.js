'use strict';
let baseConfig  = require('./webpack.config.js');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}
const env = process.env.NODE_ENV;

if (env === 'production') {
  baseConfig.mode = 'production';
  baseConfig.output.filename = 'fc-calendar-es5.min.js';
  baseConfig.module.rules[0].use.unshift({
    loader: 'babel-loader',
    query: {
      presets: ['@babel/preset-env']
    }
  });
} else if (env === 'development') {
  baseConfig.mode = 'development';
  baseConfig.output.filename = 'fc-calendar-es5.js';
  baseConfig.module.rules[0].use.unshift({
    loader: 'babel-loader',
    query: {
      presets: ['@babel/preset-env']
    }
  });
};

module.exports = baseConfig;
