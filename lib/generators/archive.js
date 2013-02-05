var fs = require('fs'),
    jade = require('jade');

var Archive = function (siteData) {

  var posts = siteData.posts;

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data),
      out = fn({ posts: posts });
    mkdir('./build/archive', out, callback);
  };

  var mkdir = function(path, out, callback) {
    fs.mkdir(path, function (err, dir) {
      writeFile('./build/archive/index.html', out, callback);
    });
  };

  var writeFile = function (path, out, callback) {
    fs.writeFile(path, out, function (err, data) {
      callback(err, data);
    });
  };

  this.init = function(callback) {
    readFile('./src/_layouts/archive.jade', callback);
  };

};

module.exports = Archive;

