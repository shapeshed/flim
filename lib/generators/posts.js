var fs = require('fs'),
  path = require('path'),
  jade = require('jade');

var Posts = function (siteData, config) {

  var posts = siteData.posts;

  var readFile = function (callback) {
    fs.readFile(path.resolve(config.pages.posts.template), 'utf-8', function(err, data) {
      if (err) { throw err; }
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
      filename: config.pages.posts.template
    }),
      out = fn({
        post: post,
        title: post.title + " | " + config.site_name,
        keywords: post.tags,
        description: post.description
      });
    writeFile(post, out, counter, callback);
  };

  var writeFile = function (post, out, counter, callback) {
    fs.mkdir(path.resolve(config.build_dir + '/' + post.slug), function (err, mkdir) {
      if (err) { throw err; }
      fs.writeFile(path.resolve(config.build_dir + '/' + post.slug + '/index.html'), out, function (err, data) {
        if (err) { throw err; }
        if (counter+1 === posts.length) {
          callback(false, true);
        }
      });
    });
  };

  this.init = function(callback) {
    readFile(callback);
  };

};

module.exports = Posts;

