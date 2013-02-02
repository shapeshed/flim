var fs = require('fs'),
    _ = require('underscore'),
    jade = require('jade');

var Generator = function (siteData) {

  var posts = siteData.posts,
      tags = siteData.tags;

  this.init = function() {
    generatePostPages('foo', function() {
    });
  };

  var writePost = function(post, data) {
    fs.mkdir('./build/' + post.slug, function (err, mkdir) {
      if (err) { throw err; }
      fs.writeFile('./build/' + post.slug + '/index.html', data, function (err, writeFile) {
        if (err) { throw err; }
      });
    });
  };

  var generateIndex = function (path, callback) {
    fs.readFile('./src/_layouts/index.jade', 'utf-8', function (err, data) {
      if (err) { throw err; }
      var fn = jade.compile(data);
      var post = posts[0];
      var out = fn({
        title: post.title,
        body: post.markup,
        date: post.date,
        description: post.description,
        tags: post.tags
      });
      fs.writeFile('./build/index.html', out, function (err, writeFile) {
        if (err) { throw err; }
      });
    });
  };

  var generatePostPages = function (path, callback) {
    fs.readFile('./src/_layouts/post.jade', 'utf-8', function (err, data) {
      if (err) { throw err; }
      var fn = jade.compile(data);
      for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var out = fn({
          title: post.title,
          body: post.markup,
          date: post.date,
          description: post.description,
          tags: post.tags
        });
        writePost(post, out);
        if (i+1 === posts.length) {
          generateIndex();
          generateArchivePage('foo', callback);
        }
      }
    });
  };

  var generateArchivePage = function (path, callback) {
    fs.readFile('./src/_layouts/archive.jade', 'utf-8', function(err, data) {
      var fn = jade.compile(data);
      if (err) { throw err; }
      var out = fn({ posts: posts });
      fs.mkdir('./build/archive', function (err, mkdir) {
        if (err) { throw err; }
        fs.writeFile('./build/archive/index.html', out, function (err, writeFile) {
          if (err) { throw err; }
          generateTagPages('foo', callback);
        });
      });
    });
  };

  var generateTagPages = function (path, callback) {
    fs.readFile('./src/_layouts/tag.jade', 'utf-8', function(err, data) {
      var fn = jade.compile(data);
      if (err) { throw err; }
      fs.mkdir('./build/tag/', function (err, mkdir) {
        if (err) { throw err; }
        Object.keys(tags).forEach(function(tag) {
          var out = fn({
            title: tags[tag].title,
            posts: tags[tag].posts,
          });
          fs.mkdir('./build/tag/' + tags[tag].slug, function (err, mkdir) {
            if (err) { throw err; }
            fs.writeFile('./build/tag/' + tags[tag].slug + '/index.html', out, function (err, writeFile) {
              if (err) { throw err; }
            });
          });
        });
      });
    });
  };


    /**
    * Google Sitemap page
    * TODO
    */

    /**
    * Atom Feed
    * TODO
    */


};

module.exports = Generator;
