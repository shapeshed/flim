var assert = require("assert"),
  factories = require('./support/factories'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  path = require('path'),
  config = require(path.resolve(__dirname + '/fixtures/flimrc.json')),
  AtomGenerator = require('../lib/generators/atom');

describe('AtomGenerator', function () {

  beforeEach(function(done) {
    fs.mkdir('./build', function (err, data) {
      done();
    });
  });

  it('should write an atom.xml file to the destination', function (done) {
    var atom = new AtomGenerator(factories, config);
    atom.init(function (err, data) {
      fs.exists(config.build_dir + '/atom.xml', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should return true to the callback if successful', function (done) {
    var atom = new AtomGenerator(factories, config);
    atom.init(function (err, data) {
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
