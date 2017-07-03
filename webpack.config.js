const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-redux-webaudio.js',
    library: 'reactReduxWebaudio',
    libraryTarget: 'umd'
  },
  context: __dirname,
  module: {
    loaders: [{
      test: /jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  externals: [
    'react',
    'redux',
    'react-redux'
  ]
};
