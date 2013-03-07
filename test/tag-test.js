var assert = require("assert"),
  helper = require('./support/test_helper'),
  Post = require('../lib/models/post'),
  Tag = require('../lib/models/tag');

describe('Tag', function () {

  it('should parse the title correctly', function () {
    var tag = new Tag('foo');
    assert.deepEqual(tag.title, 'foo');
  });

  it('should parse the slug correctly', function () {
    var tag = new Tag('Alpha Beta');
    assert.deepEqual(tag.slug, 'alpha-beta');
  });

  it('should initialise with an empty posts array', function () {
    var tag = new Tag('foo');
    assert.deepEqual(tag.posts, []);
  });

  it('should correctly add posts to the posts array', function (done) {
    var tag = new Tag('foo');
    helper.parsePost(__dirname + '/fixtures/_posts/post.md', function (err, data, stats) {
      var post = new Post('post.md', stats, data);
      tag.addPost(post);
      assert.deepEqual(tag.posts.length, 1);
      done();
    });
  });

});
