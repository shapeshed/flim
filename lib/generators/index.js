var fs = require('fs'),
    path = require('path'),
    jade = require('jade');

var Index = function (posts, options) {

  var template = options.template,
    destination = options.destination;

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      if (err) { throw new Error('Error reading file in archive generator' + err); }
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data, {
      filename: path.resolve(template)
    }),
      out = fn({
        posts: posts,
        title: "Home | Shape Shed"
      });
    writeFile(destination, out, callback);
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

module.exports = Index;

