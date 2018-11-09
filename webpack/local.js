// Webpack Local Config
var path = require('path');

var webpackConfig = {
  entry: {
    app: './src/app/index.js'
  },
  output: {
    path:       path.join(__dirname, '../public/dist'),
    filename:   '[name].min.js',
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      logger$:       path.resolve(__dirname, '../src/app/Logger.js'),
      utility$:      path.resolve(__dirname, '../src/app/utility.js'),
      forge:         path.resolve(__dirname, '../src/app/Forge.js'),
      EventEmitter$: path.resolve(__dirname, '../src/app/EventEmitter.js')
    },
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'source-map',
  module:  {
    rules: [{
      test:    /\.js?$/,
      loader:  'babel-loader',
      exclude: /node_modules/
    },
    {
      test:    /\.jsx?$/,
      loader:  'babel-loader',
      exclude: /node_modules/
    },
    {
      test:   /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test:   /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    },
    {
      test:   /\.json?$/,
      loader: 'json-loader'
    },
    {
      test:   /\.html$/,
      loader: 'html-loader'
    }
    ]
  }
};

module.exports = webpackConfig;
