var fs = require('fs'),
  path = require('path'),
    jade = require('jade');

var Tags = function (siteData, config) {

  var tags = siteData.tags;

  var createTagsDir = function (callback) {
    fs.mkdir(path.resolve(config.build_dir + '/' + config.tags.tags_dir), function (err, data) {
      if (err) { throw err; }
      readFile(path.resolve(config.tags.template), callback);
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
      filename: path.resolve(config.tags.template)
    }),
    out = fn({
      title: tag.title + " | " + config.site_name,
      tag: tag
    });
    writeFile(tag, out, counter, callback);
  };

  var writeFile = function (tag, out, counter, callback) {
    fs.mkdir(path.resolve(config.build_dir + '/' + config.tags.tags_dir + '/' + tag.slug), function (err, data) {
      if(err) { return callback(err, data); }
      fs.writeFile(path.resolve(config.build_dir + '/' + config.tags.tags_dir + '/' + tag.slug + '/index.html'), out, function (err, data) {
        if(err) { return callback(err, data); }
        if (counter+1 === tags.length) {
          callback(false, true);
        }
      });
    });
  };

  this.init = function(callback) {
    createTagsDir(callback);
  };

};

module.exports = Tags;

