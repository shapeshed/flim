var assert = require("assert"),
  factories = require('./support/factories'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  path = require('path'),
  config = require(path.resolve(__dirname + '/fixtures/flimrc.json')),
  TagsGenerator = require('../lib/generators/tags');

describe('TagsGenerator', function () {

  beforeEach(function(done) {
    fs.mkdir('./build', function (err, data) {
      done();
    });
  });

  it('should create a folder for tags', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.stat(config.build_dir + '/' + config.tags.tags_dir, function(err, data) {
        if (err) { throw err; }
        assert.deepEqual(data.isDirectory(), true);
        done();
      });
    });
  });


  it('should generate a folder for the first tag', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.exists(config.build_dir + '/' + config.tags.tags_dir + '/' + 'tag1', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should generate an index file with the folder for the first tag', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.exists(config.build_dir + '/' + config.tags.tags_dir + '/' + 'tag1/index.html', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should populate the index file for the first tag with expected contents', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.readFile(config.build_dir + '/' + config.tags.tags_dir + '/' + 'tag1/index.html', 'utf-8', function(err, data) {
        if(err) { throw err; }
        assert.deepEqual(data, '<!DOCTYPE html><html><head><title>tag1 </title></head><body><h1>tag1 </h1><ul><li>Factory post</li><li>Factory post 2</li></ul></body></html>');
        done();
      });
    });
  });

  it('should generate a folder for the second tag', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.exists(config.build_dir + '/' + config.tags.tags_dir + '/' + 'tag2', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should generate an index file with the folder for the second tag', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.exists(config.build_dir + '/' + config.tags.tags_dir + '/' + 'tag2/index.html', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should populate the index file for the second tag with expected contents', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.readFile(config.build_dir + '/' + config.tags.tags_dir + '/'+ 'tag2/index.html', 'utf-8', function(err, data) {
        if(err) { throw err; }
        assert.deepEqual(data, '<!DOCTYPE html><html><head><title>tag2 </title></head><body><h1>tag2 </h1><ul><li>Factory post</li><li>Factory post 2</li></ul></body></html>');
        done();
      });
    });
  });

  it('should generate a folder for the third tag', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.exists(config.build_dir + '/' + config.tags.tags_dir + '/' + 'tag3', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should generate an index file with the folder for the third tag', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.exists(config.build_dir + '/' + config.tags.tags_dir + '/' + 'tag3/index.html', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should populate the index file for the third tag with expected contents', function (done) {
    var tags = new TagsGenerator(factories, config);
    tags.init(function (err, data) {
      fs.readFile(config.build_dir + '/' + config.tags.tags_dir + '/' + 'tag3/index.html', 'utf-8', function(err, data) {
        if(err) { throw err; }
        assert.deepEqual(data, '<!DOCTYPE html><html><head><title>tag3 </title></head><body><h1>tag3 </h1><ul><li>Factory post 2</li></ul></body></html>');
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
