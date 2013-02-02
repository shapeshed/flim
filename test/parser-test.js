var assert = require("assert"),
  helper = require('./support/test_helper'),
  Parser = require('../lib/parser');

describe('Parser', function () {

  it('should parse the number of posts correctly', function (done) {
    Parser.init(__dirname + '/fixtures/', function (err, data) {
      assert.deepEqual(data.posts.length, 2);
      done();
    });
  });


});
