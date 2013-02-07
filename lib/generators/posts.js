var fs = require('fs'),
    jade = require('jade');

var Posts = function (siteData) {

  var posts = siteData.posts;

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      generatePosts(data, callback);
    });
  };

  var generatePosts = function (jadeTemplate, callback) {
    for (var i = 0; i < posts.length; i++) {
      compileJade(jadeTemplate, posts[i], callback);
      if (i+1 === posts.length) {
        console.log('done');
      }
    }
  };

  var compileJade = function (data, post, callback) {
    var fn = jade.compile(data),
      out = fn({
        title: post.title,
        body: post.markup,
        date: post.date,
        description: post.description,
        tags: post.tags
      });
    writeFile(post, out, callback);
  };

  var writeFile = function (post, out, callback) {
    fs.mkdir('./build/' + post.slug, function (err, mkdir) {
      fs.writeFile('./build/' + post.slug + '/index.html', out, function (err, data) {
        callback(err, data);
      });
    });
  };

  this.init = function(callback) {
    readFile('./src/_layouts/post.jade', callback);
  };

};

module.exports = Posts;
