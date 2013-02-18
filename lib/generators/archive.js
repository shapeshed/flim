var fs = require('fs'),
    jade = require('jade');

var Archive = function (posts, options) {

  var template = options.template,
    buildDir = options.buildDir,
    destination = options.destination;

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      if(err) { return callback(err, data); }
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data),
      out = fn({ posts: posts });
    mkdir(destination, out, callback);
  };

  var mkdir = function(path, out, callback) {
    fs.mkdir(buildDir, function (err, dir) {
      writeFile(destination, out, callback);
    });
  };

  var writeFile = function (path, out, callback) {
    fs.writeFile(path, out, function (err, data) {
      callback(err, data);
    });
  };

  this.init = function(callback) {
    readFile(template, callback);
  };

};

module.exports = Archive;

