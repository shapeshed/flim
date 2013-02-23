var assert = require("assert"),
  factories = require('./support/factories'),
  rimraf = require('rimraf'),
  fs = require('fs'),
  SitemapGenerator = require('../lib/generators/sitemap');

describe('SitemapGenerator', function () {

  beforeEach(function(done) {
    fs.mkdir('./tmp', function (err, data) {
      done();
    });
  });

  it('should write an sitemap.xml file to the destination', function (done) {
    var options = {
      destination: "./tmp/sitemap.xml"
    };
    var sitemap = new SitemapGenerator(factories.posts, options);
    sitemap.init(function (err, data) {
      fs.exists(options.destination, function(exists) {
        assert.deepEqual(exists, true);
        done();
      });
    });
  });

  it('should return true to the callback if successful', function (done) {
    var options = {
      destination: "./tmp/sitemap.xml"
    };
    var sitemap = new SitemapGenerator(factories.posts, options);
    sitemap.init(function (err, data) {
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
