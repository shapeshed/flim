var fs = require('fs'),
    _ = require('underscore'),
    glob = require('glob'),
    Post = require('../models/post'),
    Tag = require('../models/tag');

var Parser = function (postsPath) {

  var completed = 0,
    tagList = [],
    tags = [],
    posts = [];

  this.init = function (path, callback) {
    readPostsDirectory(path, callback);
  };

  var readPostsDirectory = function (path, callback) {
    glob(path + '*.md', false, function (err, files) {
      parsePosts(path, files, callback);
    });
  };

  var parsePosts = function (path, files, callback) {
    files.forEach(function (file) {
      fs.stat(file, function (err, stats) {
        fs.readFile(file, 'utf-8', function (err, data) {
          var post = new Post(file, stats, data);
          posts.push(post);
          tagList = _.union(post.tags, tagList);
          completed++;
          if (completed === files.length) {
            posts.sort(function (a, b) {
              return (new Date(a.date) > new Date(b.date)) ? -1 : 1;
            });
            populateTags(posts, tagList, callback);
          }
        });
      });
    });
  };

  var populateTags = function (posts, tagList, callback) {
    for (var i = 0; i < tagList.length; i++) {
      var tag = new Tag(tagList[i]);
      for (var x = 0; x < posts.length; x++) {
        if (posts[x].tags.indexOf(tagList[i]) !== -1) {
          tag.addPost(posts[x]);
        }
        if (x + 1 === posts.length) {
          delete tag.addPost;
          tags.push(tag);
        }
      }
      if (i + 1 === tagList.length) {
        return callback(undefined, { tags: tags, posts: posts });
      }
    }
  };

};

module.exports = Parser;

