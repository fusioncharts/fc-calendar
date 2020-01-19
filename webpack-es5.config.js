'use strict';
let baseConfig  = require('./webpack.config.js');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

baseConfig.mode = process.env.NODE_ENV;

baseConfig.module.rules[0].use.unshift({
  loader: 'babel-loader',
  query: {
    presets: ['@babel/preset-env']
  }
});

if (baseConfig.mode === 'production') {
  baseConfig.output.filename = 'fc-calendar-es5.min.js';
} else if (baseConfig.mode === 'none') {
  baseConfig.output.filename = 'fc-calendar-es5.js';
};

module.exports = baseConfig;
