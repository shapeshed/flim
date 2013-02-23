var fs = require('fs'),
    path = require('path'),
    jade = require('jade');

var SitemapGenerator = function (posts, options) {

  var destination = options.destination;

  var readFile = function (callback) {
    fs.readFile(path.resolve(__dirname + '/../templates/sitemap.jade'), 'utf-8', function(err, data) {
      if(err) { throw err; }
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data),
      out = fn({ posts: posts });
    writeFile(destination, out, callback);
  };

  var writeFile = function (destination, out, callback) {
    fs.writeFile(destination, out, function (err, data) {
      if(err) { throw err; }
      callback(err, true);
    });
  };

  this.init = function(callback) {
    readFile(callback);
  };
};

module.exports = SitemapGenerator;

