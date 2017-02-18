var express = require('express');
var app = express();
var router = express.Router();

var path = require('path');

var io = require('./socket/io');

router.get('/static/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/', req.path));
});

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use('/', router);

module.exports = function(port) {
  var server = app.listen(port, function(){
    console.log('listening on', port);
  });

  io(server);
};
