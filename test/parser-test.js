var assert = require("assert"),
  helper = require('./support/test_helper'),
  Parser = require('../lib/parsers/parser');

describe('Parser', function () {

  it('should parse the number of posts correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts.length, 2);
      done();
    });
  });

  it('should parse the number of tags correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.tags.length, 3);
      done();
    });
  });

  it('should parse the markup of the first post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[0].markup, '<h2>HTML!</h2>\n<p>Paragraph</p>\n');
      done();
    });
  });

  it('should parse the layout of the first post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[0].layout, 'post');
      done();
    });
  });

  it('should parse the title of the first post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[0].title, 'Phasellus id consectetur');
      done();
    });
  });

  it('should parse the description of the first post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[0].description, 'Vestibulum nec urna ut quam volutpat vehicula');
      done();
    });
  });

  it('should parse the tags of the first post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[0].tags, ['alpha', 'beta']);
      done();
    });
  });

  it('should parse the date of the first post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[0].date, new Date('Fri Jan 25 2013 11:32:12 GMT+0000 (GMT)'));
      done();
    });
  });

  it('should parse the slug of the first post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[0].slug, 'post2');
      done();
    });
  });

  it('should parse the markup of the second post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[1].markup, '<h2>HTML!</h2>\n<p>Paragraph</p>\n');
      done();
    });
  });

  it('should parse the layout of the second post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[1].layout, 'post');
      done();
    });
  });

  it('should parse the title of the second post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[1].title, 'Foo Bar Baz');
      done();
    });
  });

  it('should parse the description of the second post correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[1].description, 'Lorum dorum ipsum');
      done();
    });
  });

  it('should parse the tags of the first second correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[1].tags, ['alpha', 'beta', 'gamma']);
      done();
    });
  });

  it('should parse the date of the first second correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[1].date, new Date('Thu Jan 24 2013 16:32:12 GMT+0000 (GMT)'));
      done();
    });
  });

  it('should parse the slug of the first second correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.posts[1].slug, 'post');
      done();
    });
  });

  it('should parse the title of the first tag correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.tags[0].title, 'alpha');
      done();
    });
  });

  it('should parse the slug of the first tag correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.tags[0].title, 'alpha');
      done();
    });
  });

  it('should parse the numbers of posts for the first tag correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.tags[0].posts.length, 2);
      done();
    });
  });

  it('should parse the posts object for the first tag correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.tags[0].posts, [
        {
          title: 'Phasellus id consectetur',
          date: new Date("Fri Jan 25 2013 11:32:12 GMT+0000 (GMT)"),
          tags: [ 'alpha', 'beta' ],
          slug: 'post2'
        },
        {
          title: 'Foo Bar Baz',
          date: new Date("Thu Jan 24 2013 16:32:12 GMT+0000 (GMT)"),
          tags: [ 'alpha', 'beta', 'gamma' ],
          slug: 'post'
        }
      ]);
      done();
    });
  });

  it('should parse the numbers of posts for the second tag correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.tags[1].posts.length, 2);
      done();
    });
  });

  it('should parse the posts object for the first second correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.tags[1].posts, [
        {
          title: 'Phasellus id consectetur',
          date: new Date("Fri Jan 25 2013 11:32:12 GMT+0000 (GMT)"),
          tags: [ 'alpha', 'beta' ],
          slug: 'post2'
        },
        {
          title: 'Foo Bar Baz',
          date: new Date("Thu Jan 24 2013 16:32:12 GMT+0000 (GMT)"),
          tags: [ 'alpha', 'beta', 'gamma' ],
          slug: 'post'
        }
      ]);
      done();
    });
  });

  it('should parse the numbers of posts for the third tag correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.tags[2].posts.length, 1);
      done();
    });
  });

  it('should parse the posts object for the first second correctly', function (done) {
    var parser = new Parser();
    parser.init(__dirname + '/fixtures/_posts/', function (err, data) {
      assert.deepEqual(data.tags[2].posts, [
        {
          title: 'Foo Bar Baz',
          date: new Date("Thu Jan 24 2013 16:32:12 GMT+0000 (GMT)"),
          tags: [ 'alpha', 'beta', 'gamma' ],
          slug: 'post'
        }
      ]);
      done();
    });
  });

});
