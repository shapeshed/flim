var fs = require('fs'),
    _ = require('underscore'),
    jade = require('jade');

var Site = function (data) {

  this.generate = undefined;

  var posts = data.posts,
    tags = data.tags;

  var readPostTemplate = function (path, callback) {
    fs.readFile(__dirname + '/../src/_layouts/post.jade', 'utf-8', function (err, data) {
      if (err) { throw err; }
      callback(data);
    });
  };

  var compilePostToJade = function (post, callback) {
    var fn = jade.compile(data),
    post = posts[i],
    out = fn({ title: post.title, body: post.markup, tags: post.tags });
    callback(out);
  };

  var writePost = function (out) {
    fs.writeFile(__dirname + '/../build/' + post.slug + '/index.html', out, function (err, writeFile) {
      if (err) { throw err; }
    });
  };


};

module.exports = Site;
