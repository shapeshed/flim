var assert = require("assert"),
  factories = require('./support/factories'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  ArchiveGenerator = require('../lib/generators/archive');

describe('ArchiveGenerator', function () {

  beforeEach(function(done) {
    fs.mkdir('./tmp', function (err, data) {
      done();
    });
  });

  it('should create an archive folder', function (done) {
    done();
  });

  it('should write an index.html file to the destination', function (done) {
    var options = {
      template: "./test/fixtures/_layouts/archive.jade",
      buildDir: "./tmp/archive",
      destination: "./tmp/archive/archive.html"
    };
    var archive = new ArchiveGenerator(factories.posts, options);
    archive.init(function (err, data) {
      fs.exists(options.destination, function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should populate the file with the expected contents', function (done) {
    var options = {
      template: "./test/fixtures/_layouts/archive.jade",
      buildDir: "./tmp/archive",
      destination: "./tmp/archive/archive.html"
    };
    var archive = new ArchiveGenerator(factories.posts, options);
    archive.init(function (err, data) {
      fs.readFile(options.destination, 'utf-8', function(err, data) {
        if(err) { throw err; }
        assert.deepEqual(data, '<!DOCTYPE html><html><head><title>Archive</title></head><body><h1>Archive</h1><ul><li>Factory post</li><li>Factory post 2</li></ul></body></html>');
        done();
      });
    });
  });

  it('should return true to the callback if successful', function (done) {
    var options = {
      template: "./test/fixtures/_layouts/archive.jade",
      buildDir: "./tmp/archive",
      destination: "./tmp/archive/archive.html"
    };
    var archive = new ArchiveGenerator(factories.posts, options);
    archive.init(function (err, data) {
      assert.deepEqual(data, true);
      done();
    });
  });

  afterEach(function(done) {
    rimraf('./tmp', function (err) {
      done();
    });
  });

});
