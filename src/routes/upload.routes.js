let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let express = require('express');
let _router = express.Router();
let gfsEasy = require('../database');

let putFile = function (path, name, callback) {
  try {
      if (typeof path == 'undefined') throw '(path) of the image is undefined in (putFile) function';
      if (typeof name == 'undefined') throw '(name) of the image is undefined in (putFile) function';
      // if (typeof extension == 'undefined') throw '(extension) of the image is undefined in (putFile) function';
      gfs.createWriteStream(
          {filename: name},
          function (err, writestream) {
              if (err) callback(err, null);
              else {
                  if (writestream) {
                      fs.createReadStream(path).pipe(writestream);

                      writestream.on('close', function (file) {
                          callback(null, file);
                      });
                  }
              }
          });
  }
  catch (err) {
      var error = {};
      error.message = err;
      error.status = 27017;
      callback(error, null);
  }
};

  //make use of gfsEasy methods (e.g. gfsEasy.getInfoById())
  _router.route('/putFile')
        .post(multipartMiddleware, function (req, res, next) {
          console.log(req.files.file);
            putFile(req.files.file.path,
                req.files.file.name,
                function (err, file) {
                    if (err) next(err);
                    res.json(file);
                })
        });


module.exports = _router;