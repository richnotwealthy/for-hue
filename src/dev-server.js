var express = require('express');
var app = express();
var router = express.Router();

var logger = require('morgan');

var path = require('path');
var config = require( '../config/webpack.config.dev');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var io = require('./socket/io');

app.use(logger('dev'));

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  historyApiFallback: true,
  hot: true, // Note: only CSS is currently hot reloaded
  publicPath: config.output.publicPath,
  quiet: false,
  stats: {colors: true, chunks: false},
  watchOptions: {
    ignored: /node_modules/
  }
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/index-dev.html'));
});

app.use('/', router);

module.exports = function(port) {
  var server = app.listen(port, function(){
    console.log('listening on', port);
  });

  io(server);
};
