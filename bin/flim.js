#!/usr/bin/env node
var rimraf = require('rimraf'),
  fs = require('fs'),
  parser = require('../lib/parser'),
  ArchivePage = require('../lib/generators/archive'),
  IndexPage = require('../lib/generators/index'),
  PostsPages = require('../lib/generators/posts'),
  Generator = require('../lib/generator');

var args = process.argv.splice(2);

if (args[0] === "generate") {
  rimraf('./build', function (err) {
    fs.mkdir('./build', function (err, mkdir) {
      if (err) { throw err; }
      parser.init('./src/_posts/', function (err, data) {
        //var generator = new Generator(data);
        //generator.init();
        var archive = new ArchivePage(data);
        var index = new IndexPage(data.posts[0]);
        var postsPages = new PostsPages(data);
        archive.init(function(err, data){
        });
        index.init(function(err, data){
        });
        postsPages.init(function(err, data){
        });
      });
    }); });
}


