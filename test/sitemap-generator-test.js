var assert = require("assert"),
  factories = require('./support/factories'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  path = require('path'),
  config = require(path.resolve(__dirname + '/../lib/templates/flimrc.json')),
  SitemapGenerator = require('../lib/generators/sitemap');

describe('SitemapGenerator', function () {

  beforeEach(function(done) {
    fs.mkdir('./build', function (err, data) {
      done();
    });
  });

  it('should write an sitemap.xml file to the destination', function (done) {
    var sitemap = new SitemapGenerator(factories, config);
    sitemap.init(function (err, data) {
      fs.exists(config.build_dir + '/sitemap.xml', function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should return true to the callback if successful', function (done) {
    var sitemap = new SitemapGenerator(factories, config);
    sitemap.init(function (err, data) {
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
