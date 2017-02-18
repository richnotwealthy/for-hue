var io = require('socket.io');
var PDFImage = require("pdf-image").PDFImage;
var tmp = require('tmp');
var fs = require('fs');
var PDFParser = require("pdf2json");

module.exports = function(server) {

  io(server).on('connection', function(socket) {
    socket.on('pdf-upload', function(pdfBuffer) {
      console.log('got a pdf')

      var pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", function(errData) { console.error(errData.parserError); } );

      pdfParser.on("pdfParser_dataReady", function(pdfData) {
        tmp.file(function (err, path, fd, cleanupCallback) {
          if (err) throw err;

          console.log("File: ", path);
          console.log("Filedescriptor: ", fd);

          fs.appendFile(path, pdfBuffer);

          var pdfImage = new PDFImage(path);
          console.log(pdfImage);
          pdfImage.convertPage(1).then(function(imagePath) {
            console.log(imagePath);
            cleanupCallback();
          });
        });
      });

      pdfParser.parseBuffer(pdfBuffer);
    })
  });

}