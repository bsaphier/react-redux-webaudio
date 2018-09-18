const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-redux-webaudio.js',
    library: 'reactReduxWebaudio',
    libraryTarget: 'umd'
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }
        }
      }
    ]
  },
  externals: ['react', 'redux', 'react-redux']
};
