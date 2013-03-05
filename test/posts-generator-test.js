var assert = require("assert"),
  factories = require('./support/factories'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  path = require('path'),
  config = require(path.resolve(__dirname + '/../lib/templates/flimrc.json')),
  PostsGenerator = require('../lib/generators/posts');

describe('PostsGenerator', function () {

  beforeEach(function(done) {
    fs.mkdir('./build', function (err, data) {
      done();
    });
  });

  it('should create a folder for the first post', function (done) {
    var postsGenerator = new PostsGenerator(factories, config);
    postsGenerator.init(function (err, data) {
      if (err) { throw err; }
      fs.stat(config.build_dir + '/' + 'factory-post', function(err, data) {
        if (err) { throw err; }
        assert.deepEqual(data.isDirectory(), true);
        done();
      });
    });
  });

  it('should write an index.html file within the first post folder', function (done) {
    var postsGenerator = new PostsGenerator(factories, config);
    postsGenerator.init(function (err, data) {
      fs.exists(config.build_dir + '/' + 'factory-post/index.html', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should populate the index file with the expected contents', function (done) {
    var postsGenerator = new PostsGenerator(factories, config);
    postsGenerator.init(function (err, data) {
      fs.readFile(config.build_dir + '/' + 'factory-post/index.html', 'utf-8', function(err, data) {
        if(err) { throw err; }
        assert.deepEqual(data, '<!DOCTYPE html><html><head><title>Factory post</title></head><body><h1>Factory post</h1><h1>Some HTML!</h1></body></html>');
        done();
      });
    });
  });

  it('should create a folder for the second post', function (done) {
    var postsGenerator = new PostsGenerator(factories, config);
    postsGenerator.init(function (err, data) {
      fs.stat(config.build_dir + '/' + 'factory-post2', function(err, data) {
        if (err) { throw err; }
        assert.deepEqual(data.isDirectory(), true);
        done();
      });
    });
  });

  it('should write an index.html file within the second post folder', function (done) {
    var postsGenerator = new PostsGenerator(factories, config);
    postsGenerator.init(function (err, data) {
      fs.exists(config.build_dir + '/' + 'factory-post2/index.html', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should populate the index file with the expected contents', function (done) {
    var postsGenerator = new PostsGenerator(factories, config);
    postsGenerator.init(function (err, data) {
      fs.readFile(config.build_dir + '/' + 'factory-post2/index.html', 'utf-8', function(err, data) {
        if(err) { throw err; }
        assert.deepEqual(data, '<!DOCTYPE html><html><head><title>Factory post 2</title></head><body><h1>Factory post 2</h1><h1>Some more HTML!</h1></body></html>');
        done();
      });
    });
  });

  afterEach(function(done) {
    rimraf('./build', function (err) {
      done();
    });
  });

});
