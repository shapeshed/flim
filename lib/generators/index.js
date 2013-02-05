var fs = require('fs'),
    jade = require('jade');

var IndexPage = function (indexPost) {

  var post = indexPost;

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data),
      out = fn({
        title: post.title,
        body: post.markup,
        date: post.date,
        description: post.description,
        tags: post.tags
      });
    writeFile('./build/index.html', out, callback);
  };

  var writeFile = function (path, out, callback) {
    fs.writeFile(path, out, function (err, data) {
      callback(err, data);
    });
  };

  this.init = function(callback) {
    readFile('./src/_layouts/index.jade', callback);
  };

};

module.exports = IndexPage;

