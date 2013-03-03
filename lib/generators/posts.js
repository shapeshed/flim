var fs = require('fs'),
    jade = require('jade');

var Posts = function (posts, options) {

  var template = options.template,
    destination = options.destination;

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      if(err) { return callback(err, data); }
      generatePosts(data, callback);
    });
  };

  var generatePosts = function (jadeTemplate, callback) {
    for (var i = 0; i < posts.length; i++) {
      compileJade(jadeTemplate, posts[i], i, callback);
    }
  };

  var compileJade = function (data, post, counter, callback) {
    var fn = jade.compile(data, {
      filename: template
    }),
      out = fn({
        post: post,
        title: post.title + " | Shape Shed"
      });
    writeFile(post, out, counter, callback);
  };

  var writeFile = function (post, out, counter, callback) {
    fs.mkdir(destination + post.slug, function (err, mkdir) {
      if (err) { throw err; }
      fs.writeFile(destination + post.slug + '/index.html', out, function (err, data) {
        if (err) { throw err; }
        if (counter+1 === posts.length) {
          callback(false, true);
        }
      });
    });
  };

  this.init = function(callback) {
    readFile(template, callback);
  };

};

module.exports = Posts;

