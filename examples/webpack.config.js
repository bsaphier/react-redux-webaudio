const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 1337
  },
  module: {
    loaders: [{
      test: /jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.scss$/,
      exclude: /(node_modules)/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
};
