var fs = require('fs'),
    jade = require('jade');

var TagsPages = function (siteData) {

  var post = indexPost;

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      compileJade(data, callback);
    });
  };

  var compileJade = function (data, callback) {
    var fn = jade.compile(data),
      out = fn({
        title: post.title,
        body: post.markup,
        date: post.date,
        description: post.description,
        tags: post.tags
      });
    writeFile('./build/index.html', out, callback);
  };

  var writeFile = function (path, out, callback) {
    fs.writeFile(path, out, function (err, data) {
      callback(err, data);
    });
  };

  this.init = function(callback) {
    readFile('./src/_layouts/index.jade', callback);
  };

};

module.exports = TagsPage;

  var generateTagPages = function (path, callback) {
    fs.readFile('./src/_layouts/tag.jade', 'utf-8', function(err, data) {
      var fn = jade.compile(data);
      if (err) { throw err; }
      fs.mkdir('./build/tag/', function (err, mkdir) {
        if (err) { throw err; }
        Object.keys(tags).forEach(function(tag) {
          var out = fn({
            title: tags[tag].title,
            posts: tags[tag].posts,
          });
          fs.mkdir('./build/tag/' + tags[tag].slug, function (err, mkdir) {
            if (err) { throw err; }
            fs.writeFile('./build/tag/' + tags[tag].slug + '/index.html', out, function (err, writeFile) {
              if (err) { throw err; }
            });
          });
        });
      });
    });
  };
