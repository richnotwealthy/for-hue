var io = require('socket.io');
var tmp = require('tmp');
var gm = require('gm').subClass({imageMagick: true});
var fs = require('fs');
var pdfPageCount = require('pdf_page_count');
var Jimp = require('jimp');
var Q = require('q');
var daltonize = require('./daltonize');

module.exports = function(server) {

  io(server).on('connection', function(socket) {
    socket.on('pdf-upload', function(pdfBuffer, cbType) {
      console.log('got a pdf')

      pdfPageCount.count(pdfBuffer, function(resp) {
        if (!resp.success) throw resp.error;

        var numOfPages = resp.data;
        console.log('pages:', numOfPages);

        // create temporary file in root/tmp
        tmp.file(function (err, path, fd, cleanupCallback) {
          if (err) throw err;

          var imagePath = path+'.png',
              daltonizedPath = path+'-daltonized.pdf';

          // copy the uploaded pdf file into the temporary file
          fs.appendFile(path, pdfBuffer, function(err) {
            if (err) throw err;

            gm(path).density(300)
              .quality(100)
              .setFormat('png')
              .write(imagePath, function(err) {
                if (err) throw err;

                if (+numOfPages === 1) {
                  Jimp.read(imagePath, function(err, image) {
                    daltonize(image.bitmap.data, cbType, function(correctedImageBuffer) {
                      image.bitmap.data = correctedImageBuffer;

                      image.write(imagePath, function(err) {
                        if (err) throw err;

                        gm(imagePath).write(daltonizedPath, function(err) {
                          if (err) throw err;
                          console.log('daltonized! at', daltonizedPath);

                          fs.readFile(daltonizedPath, function(err, data) {
                            if (err) throw err;

                            // send back daltonized file
                            socket.emit('pdf-daltonized', data);

                            // delete tmp files
                            fs.unlinkSync(imagePath);
                            cleanupCallback();
                          });
                        });

                      });
                    });
                  });
                } else {
                  var promiseArray = [];
                  for (var i = 0; i < numOfPages; i++) {
                    var currentImagePath = path+'-'+i+'.png';
                    promiseArray[i] = (function(curPath, curIndex) {
                      var deferred = Q.defer();
                      Jimp.read(curPath, function(err, image) {
                        daltonize(image.bitmap.data, 'Protanope', function(correctedImageBuffer) {
                          image.bitmap.data = correctedImageBuffer;

                          image.write(curPath, function(err) {
                            if (err) throw err;
                            deferred.resolve();
                          });
                        });
                      });
                      return deferred.promise;
                    })(currentImagePath, i);
                  }

                  Q.all(promiseArray).then(function() {
                    gm(path+'-*.png').write(daltonizedPath, function(err) {
                      if (err) throw err;
                      console.log('daltonized! at', daltonizedPath);

                      fs.readFile(daltonizedPath, function(err, data) {
                        if (err) throw err;

                        // send back daltonized file
                        socket.emit('pdf-daltonized', data);

                        // delete tmp files
                        for (var i = 0; i < numOfPages; i++) {
                          fs.unlinkSync(path+'-'+i+'.png');
                        }
                        cleanupCallback();
                      });
                    });
                  })
                }
              });
          });
        });
      });
    })
  });

}