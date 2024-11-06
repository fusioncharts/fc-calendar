path = require("path");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'fc-calendar.js',
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'umd',
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
      use: [
        { loader: 'style-loader', options: { attributes: { id: 'fc__calendar__style' } , 
        insert: require.resolve("./insert-function") } },
        { loader: 'css-loader' }
      ],
      exclude: /node_modules/
    }]
  },
  mode: 'none',
  devServer: { inline: true }
};
