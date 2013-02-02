var fs = require('fs');

var helper = function () {

  this.parsePost = function (path, callback) {
    fs.readFile(path, 'utf-8', function (err, data) {
      if (err) { throw err; }
      statFile(path, data, callback);
    });
  };

  var statFile = function (path, data, callback) {
    fs.stat(path, function (err, stats) {
      if (err) { throw err; }
      callback(err, data, stats);
    });
  };

};

module.exports = new helper();
