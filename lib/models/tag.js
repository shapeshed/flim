var Tag = function (tag) {

  var generateSlug = function (tag) {
    return tag.replace(/\s+/g, '-').replace(/\.+/g, '-').toLowerCase();
  };

  this.title = tag;
  this.slug = generateSlug(tag);
  this.posts = [];
  this.addPost = function (post) {
    this.posts.push({ 
      title: post.title, 
      date: post.date, 
      tags: post.tags,
      slug: post.slug 

    });
  };

};

module.exports = Tag;
