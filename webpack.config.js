path = require("path");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'fc-calendar.js',
    path: path.resolve(__dirname, "dist"),
    publicPath: '/dist/'
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
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader",
      exclude: /node_modules/
    }]
  },
  devServer: { inline: true }
};
