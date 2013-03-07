var rimraf = require('rimraf'),
  fs = require('fs'),
  path = require('path'),
  Parser = require('./parsers/parser'),
  IndexPage = require('./generators/index'),
  PostsGenerator = require('./generators/posts'),
  TagsGenerator = require('./generators/tags'),
  AtomGenerator = require('./generators/atom'),
  SitemapGenerator = require('./generators/sitemap');

var Flim = function() {

  var readConfig = function(callback) {
    fs.exists('./.flimrc', function(exists) {
      if (exists) {
        fs.readFile('./.flimrc', 'utf-8', function(err, data) {
          if(err) { throw err; }
          try {
            var config = JSON.parse(data);
            callback(err, config);
          } catch(err) {
            throw err;
          }
        });
      } else {
        fs.readFile(path.resolve(__dirname + '/../templates/.flimrc'), 'utf-8', function(err, data) {
          if(err) { throw err; }
          var config = JSON.parse(data);
          callback(err, config);
        });
      }
    });
  };

  this.init = function() {
    readConfig(function (err, config) {
      if (err) { throw err; }
      rimraf(config.build_dir, function (err) {
        fs.mkdir(config.build_dir, function (err, mkdir) {
          if (err) { throw err; }
          var parser = new Parser();
          parser.init(config.src_dir + '/_posts/', function (err, data) {
            var atomGenerator = new AtomGenerator(data, config);
            atomGenerator.init(function (err, data) {
              if (err) { throw err; }
            });
            var postsGenerator = new PostsGenerator(data, config);
            postsGenerator.init(function (err, data) {
              if (err) { throw err; }
            });
            var tags = new TagsGenerator(data, config);
            tags.init(function (err, data) {
              if (err) { throw err; }
            });
            var indexPage = new IndexPage(data, config);
            indexPage.init(function (err, data) {
              if (err) { throw err; }
            });
            var sitemapGenerator = new SitemapGenerator(data, config);
            sitemapGenerator.init(function (err, data) {
              if (err) { throw err; }
            });
          });
        });
      });
    });
  };
};

module.exports = new Flim();
