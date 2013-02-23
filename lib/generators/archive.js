var fs = require('fs'),
    jade = require('jade');

var Archive = function (posts, options) {

  var template = options.template,
    buildDir = options.buildDir,
    destination = options.destination;

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      if (err) { throw new Error('Error reading file in archive generator' + err); }
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data),
      out = fn({ posts: posts });
    mkdir(destination, out, callback);
  };

  var mkdir = function(path, out, callback) {
    fs.mkdir(buildDir, function (err, data) {
      if (err) { throw new Error('Error making directory in archive generator' + err); }
      writeFile(destination, out, callback);
    });
  };

  var writeFile = function (path, out, callback) {
    fs.writeFile(path, out, function (err, data) {
      if (err) { throw new Error('Error writing file in archive generator' + err); }
      return callback(err, true);
    });
  };

  this.init = function(callback) {
    readFile(template, callback);
  };

};

module.exports = Archive;

