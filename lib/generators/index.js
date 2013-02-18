var fs = require('fs'),
    jade = require('jade');

var IndexPage = function (post, options) {

  var template = options.template,
    destination = options.destination;

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      if(err) { throw err; }
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data),
      out = fn({ post: post });
    writeFile(destination, out, callback);
  };

  var writeFile = function (destination, out, callback) {
    fs.writeFile(destination, out, function (err, data) {
      if(err) { throw err; }
      callback(err, true);
    });
  };

  this.init = function(callback) {
    readFile(template, callback);
  };
};

module.exports = IndexPage;

