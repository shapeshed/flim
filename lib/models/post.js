var marked = require('marked');
  path = require('path');

var Post = function(file, stats, data) {

  var metaRegex = /^{[^}]+}/;

  var meta = function(data) {
    return extractMeta(data);
  };

  var toHTML = function(data) {
    return marked(extractMarkdown(data));
  }

  var extractMarkdown = function(data) {
    return data.replace(metaRegex, "");
  }

  var extractMeta = function(data) {
    return JSON.parse(metaRegex.exec(data)[0]);
  }

  this.markup = toHTML(data);
  this.layout = meta(data).layout;
  this.title = meta(data).title;
  this.description = meta(data).description;
  this.tags = meta(data).tags;
  this.date = new Date(meta(data).date);
  this.slug = path.basename(file, '.md');
  this.mtime = stats.mtime;

}

module.exports = Post;
