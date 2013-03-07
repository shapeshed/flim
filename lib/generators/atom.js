var fs = require('fs'),
    path = require('path'),
    jade = require('jade');

var AtomGenerator = function (siteData, config) {

  var posts = siteData.posts.slice(0, 20);

  var readFile = function (callback) {
    fs.readFile(path.resolve(__dirname + '/../templates/atom.jade'), 'utf-8', function(err, data) {
      if (err) { throw err; }
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data),
      out = fn({ posts: posts });
    writeFile(config.build_dir, out, callback);
  };

  var writeFile = function (destination, out, callback) {
    fs.writeFile(path.resolve(destination + '/atom.xml'), out, function (err, data) {
      if (err) { throw err; }
      callback(err, true);
    });
  };

  this.init = function(callback) {
    readFile(callback);
  };
};

module.exports = AtomGenerator;

