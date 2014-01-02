var fs = require('fs'),
    path = require('path'),
    jade = require('jade');

var Index = function (siteData, config) {

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      if (err) { throw err; }
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data, {
      filename: path.resolve(config.pages.index.template)
    }),
      out = fn({
        posts: siteData.posts,
        title: config.pages.index.title + " | " + config.site_name,
        description: config.description,
        keywords: config.keywords
      });
    writeFile(path.resolve(config.build_dir), out, callback);
  };

  var writeFile = function (destination, out, callback) {
    fs.writeFile(path.resolve(destination + '/index.html'), out, function (err, data) {
      if (err) { throw err; }
      return callback(err, true);
    });
  };

  this.init = function(callback) {
    readFile(path.resolve(config.pages.index.template), callback);
  };

};

module.exports = Index;

