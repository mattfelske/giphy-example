const express = require('express');
const path = require('path');
const http = require('http');


var app = express();
var isLocal = true;
if (isLocal) {
  console.log('Setting up webpack for a local deployment ...');
  var webpack           = require('webpack');
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpackConfig     = require('../webpack');
  var compiler          = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
  console.log('Webpack now listening for changes ...');
}

global.fileServeRoot = path.join(__dirname, '..', 'public');
app.use(express.static(global.fileServeRoot));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, (req.body) ? req.body : undefined);
  next();
});

// Redirect all unhandled routes
app.use((req, res, next) => {
  res.redirect('/404');
});

// Internally handle a server error by logging the stack trace.
app.use((err, req, res, next) => {
  error(err.stack);
  next(err);
});

// If the request was an XHR, then we return an error JSON object.
app.use((err, req, res, next) => {
  if (req.xhr) {
    return res.status(500).send({ msg: 'Something failed!' });
  }
  next(err);
});

// Last error handling usecase, we redirect the user to a generic 500 page.
app.use((err, req, res, next) => { // eslint-disable-line
  res.redirect('/500');
});

var httpServer = http.createServer(app);
httpServer.listen(80, () => {
  console.log(`HTTP Server listening on port ${80}`);
});
