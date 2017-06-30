module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './lib/bundle.js'
  },
  context: __dirname,
  module: {
    loaders: [{
      test: /jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2016']
      }
    }]
  }
};
