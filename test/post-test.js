var assert = require("assert"),
  helper = require('./support/test_helper'),
  Post = require('../lib/models/post');

describe('Post', function () {

  it('should parse the markdown correctly', function (done) {
    helper.parsePost(__dirname + '/fixtures/post.md', function (err, data, stats) {
      var post = new Post('post.md', stats, data);
      assert.deepEqual(post.markup, "<h2>HTML!</h2>\n<p>Paragraph</p>\n");
      done();
    });
  });

  it('should parse the layout correctly', function (done) {
    helper.parsePost(__dirname + '/fixtures/post.md', function (err, data, stats) {
      var post = new Post('post.md', stats, data);
      assert.deepEqual(post.layout, "post");
      done();
    });
  });

  it('should parse the title correctly', function (done) {
    helper.parsePost(__dirname + '/fixtures/post.md', function (err, data, stats) {
      var post = new Post('post.md', stats, data);
      assert.deepEqual(post.title, "Foo Bar Baz");
      done();
    });
  });

  it('should parse the description correctly', function (done) {
    helper.parsePost(__dirname + '/fixtures/post.md', function (err, data, stats) {
      var post = new Post('post.md', stats, data);
      assert.deepEqual(post.description, "Lorum dorum ipsum");
      done();
    });
  });

  it('should parse the tags correctly', function (done) {
    helper.parsePost(__dirname + '/fixtures/post.md', function (err, data, stats) {
      var post = new Post('post.md', stats, data);
      assert.deepEqual(post.tags, ["alpha", "beta", "gamma"]);
      done();
    });
  });

  it('should parse the description correctly', function (done) {
    helper.parsePost(__dirname + '/fixtures/post.md', function (err, data, stats) {
      var post = new Post('post.md', stats, data);
      assert.deepEqual(new Date(post.date), new Date("2013-01-24T16:32:12.000Z"));
      done();
    });
  });

  it('should parse the slug correctly', function (done) {
    helper.parsePost(__dirname + '/fixtures/post.md', function (err, data, stats) {
      var post = new Post('post.md', stats, data);
      assert.deepEqual(post.slug, "post");
      done();
    });
  });

  it('should parse the mtime correctly', function (done) {
    helper.parsePost(__dirname + '/fixtures/post.md', function (err, data, stats) {
      var post = new Post('post.md', stats, data);
      assert.deepEqual(new Date(post.mtime), new Date("2013-02-05T07:22:27.000Z"));
      done();
    });
  });

});
