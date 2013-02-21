var rimraf = require('rimraf'),
  fs = require('fs'),
  Parser = require('./parsers/parser'),
  ArchivePage = require('./generators/archive'),
  IndexPage = require('./generators/index'),
  PostsGenerator = require('./generators/posts'),
  TagsGenerator = require('./generators/tags');

var Flim = function() {
  this.init = function() {
    rimraf('./build', function (err) {
      fs.mkdir('./build', function (err, mkdir) {
        if (err) { throw err; }
        var parser = new Parser();
        parser.init('./src/_posts/', function (err, data) {
          var options = {
            template: "./src/_layouts/index.jade",
            destination: "./build/index.html"
          };
          var index = new IndexPage(data.posts[0], options);
          index.init(function(err, data){
            if (err) { throw err; }
          });
          var postsOptions = {
            template: "./src/_layouts/post.jade",
            destination: "./build/"
          };
          var postsGenerator = new PostsGenerator(data.posts, postsOptions);
          postsGenerator.init(function (err, data) {
            if (err) { throw err; }
          });
          var tagsOptions = {
            template: "./src/_layouts/tag.jade",
            destination: "./build/tags/"
          };
          var tags = new TagsGenerator(data.tags, tagsOptions);
          tags.init(function (err, data) {
            if (err) { throw err; }
          });
        });
      });
    });
  };
};

module.exports = new Flim();
