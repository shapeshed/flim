var assert = require("assert"),
  factories = require('./support/factories'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  AtomGenerator = require('../lib/generators/atom');

describe('AtomGenerator', function () {

  beforeEach(function(done) {
    fs.mkdir('./tmp', function (err, data) {
      done();
    });
  });

  it('should write an atom.xml file to the destination', function (done) {
    var options = {
      destination: "./tmp/atom.xml"
    };
    var atom = new AtomGenerator(factories.posts, options);
    atom.init(function (err, data) {
      fs.exists(options.destination, function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should return true to the callback if successful', function (done) {
    var options = {
      destination: "./tmp/atom.xml"
    };
    var atom = new AtomGenerator(factories.posts, options);
    atom.init(function (err, data) {
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
