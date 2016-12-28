module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'fc-calendar.js',
    path: './dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc.json',
          failOnError: true
        }
      }],
      exclude: /node_modules/
    }]
  }
};
