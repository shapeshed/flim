var fs = require('fs'),
    jade = require('jade');

var Tags = function (tags, options) {

  var template = options.template,
    destination = options.destination;

  var createTagsDir = function (path, callback) {
    fs.mkdir(destination, function (err, data) {
      if(err) { return callback(err, data); }
      readFile(template, callback);
    });
  };

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf-8', function(err, data) {
      if(err) { return callback(err, data); }
      generateTags(data, callback);
    });
  };

  var generateTags = function (jadeTemplate, callback) {
    for (var i = 0; i < tags.length; i++) {
      compileJade(jadeTemplate, tags[i], i, callback);
    }
  };

  var compileJade = function (data, tag, counter, callback) {
    var fn = jade.compile(data, {
      filename: template
    }),
    out = fn({ title: tag.title, posts: tag.posts });
    writeFile(tag, out, counter, callback);
  };

  var writeFile = function (tag, out, counter, callback) {
    fs.mkdir(destination + tag.slug, function (err, data) {
      if(err) { return callback(err, data); }
      fs.writeFile(destination + tag.slug + '/index.html', out, function (err, data) {
        if(err) { return callback(err, data); }
        if (counter+1 === tags.length) {
          callback(false, true);
        }
      });
    });
  };

  this.init = function(callback) {
    createTagsDir(destination, callback);
  };

};

module.exports = Tags;

