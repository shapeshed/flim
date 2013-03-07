var assert = require("assert"),
  factories = require('./support/factories'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  path = require('path'),
  config = require(path.resolve(__dirname + '/fixtures/flimrc.json')),
  IndexGenerator = require('../lib/generators/index');

describe('IndexGenerator', function () {

  beforeEach(function(done) {
    fs.mkdir('./build', function (err, data) {
      done();
    });
  });

  it('should write an index.html file to the destination', function (done) {
    var index = new IndexGenerator(factories, config);
    index.init(function (err, data) {
      fs.exists(path.resolve(config.build_dir + '/index.html'), function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should populate the file with the expected contents', function (done) {
    var index = new IndexGenerator(factories, config);
    index.init(function (err, data) {
      fs.readFile(path.resolve(config.build_dir + '/index.html'), 'utf-8', function(err, data) {
        if(err) { throw err; }
        assert.deepEqual(data, '<h1>foo</h1>');
        done();
      });
    });
  });

  it('should return true to the callback if successful', function (done) {
    var index = new IndexGenerator(factories, config);
    index.init(function (err, data) {
      assert.deepEqual(data, true);
      done();
    });
  });

  afterEach(function(done) {
    rimraf('./build', function (err) {
      done();
    });
  });

});
