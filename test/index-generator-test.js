var assert = require("assert"),
  factories = require('./support/factories'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  IndexGenerator = require('../lib/generators/index');

describe('IndexGenerator', function () {

  before(function(done) {
    fs.mkdir('./tmp', function (err, data) {
      done();
    });
  });

  it('should write an index.html file to the destination', function (done) {
    var options = {
      template: "./test/fixtures/_layouts/post.jade",
      destination: "./tmp/index.html"
    };
    var index = new IndexGenerator(factories.posts[0], options);
    index.init(function (err, data) {
      fs.exists(options.destination, function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should populate the file with the expected contents', function (done) {
    var options = {
      template: "./test/fixtures/_layouts/post.jade",
      destination: "./tmp/index.html"
    };
    var index = new IndexGenerator(factories.posts[0], options);
    index.init(function (err, data) {
      fs.readFile(options.destination, 'utf-8', function(err, data) {
        if(err) { throw err; }
        assert.deepEqual(data, '<!DOCTYPE html><html><head><title>Factory post</title></head><body><h1>Factory post</h1><h1>Some HTML!</h1></body></html>');
        done();
      });
    });
  });

  it('should return true to the callback if successful', function (done) {
    var options = {
      template: "./test/fixtures/_layouts/post.jade",
      destination: "./tmp/index.html"
    };
    var index = new IndexGenerator(factories.posts[0], options);
    index.init(function (err, data) {
      assert.deepEqual(data, true);
    });
    done();
  });

  after(function(done) {
    rimraf('./tmp', function (err) {
      done();
    });
  });

});
