var rimraf = require('rimraf'),
  fs = require('fs'),
  Parser = require('./parsers/parser'),
  IndexPage = require('./generators/index'),
  PostsGenerator = require('./generators/posts'),
  TagsGenerator = require('./generators/tags'),
  AtomGenerator = require('./generators/atom'),
  SitemapGenerator = require('./generators/sitemap');

var Flim = function() {
  this.init = function() {
    rimraf('./build', function (err) {
      fs.mkdir('./build', function (err, mkdir) {
        if (err) { throw err; }
        var parser = new Parser();
        parser.init('./src/_posts/', function (err, data) {
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
          var indexOptions = {
            template: "./src/_layouts/index.jade",
            destination: "./build/index.html"
          };
          var indexPage = new IndexPage(data.posts, indexOptions);
          indexPage.init(function (err, data) {
            if (err) { throw err; }
          });
          var atomOptions = {
            destination: "./build/atom.xml"
          };
          var atomGenerator = new AtomGenerator(data.posts, atomOptions);
          atomGenerator.init(function (err, data) {
            if (err) { throw err; }
          });
          var sitemapOptions = {
            destination: "./build/sitemap.xml"
          };
          var sitemapGenerator = new SitemapGenerator(data.posts.slice(0, 20), sitemapOptions);
          sitemapGenerator.init(function (err, data) {
            if (err) { throw err; }
          });
        });
      });
    });
  };
};

module.exports = new Flim();
