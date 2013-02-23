module.exports = {
  posts: [
    {
      markup: "<h1>Some HTML!</h1>",
      layout: "post",
      title: "Factory post",
      description: "This is factory post description.",
      tags: ["tag1", "tag2", "tag2"],
      date: new Date("Thu Feb 14 2013 18:09:07 GMT+0000 (GMT)"),
      slug: "factory-post",
      mtime: new Date("Thu Feb 14 2013 18:09:07 GMT+0000 (GMT)")
    },
    {
      markup: "<h1>Some more HTML!</h1>",
      layout: "post",
      title: "Factory post 2",
      description: "This is the second factory post description.",
      tags: ["tag1", "tag3", "tag2"],
      date: new Date("Thu Feb 14 2013 18:09:07 GMT+0000 (GMT)"),
      slug: "factory-post2",
      mtime: new Date("Thu Feb 14 2013 18:09:07 GMT+0000 (GMT)")
    }
  ],
  tags: [
    {
      title: "tag1",
      slug: "tag1",
      posts: [
        {
          title: "Factory post",
          date: "Thu Feb 14 2013 18:09:07 GMT+0000 (GMT)",
          tags: ["tag1", "tag2", "tag2"]
        },
        {
          title: "Factory post 2",
          date: "Thu Feb 14 2013 18:09:07 GMT+0000 (GMT)",
          tags: ["tag1", "tag3", "tag2"]
        }
      ]
    },
    {
      title: "tag2",
      slug: "tag2",
      posts: [
        {
          title: "Factory post",
          date: "Thu Feb 14 2013 18:09:07 GMT+0000 (GMT)",
          tags: ["tag1", "tag2", "tag2"]
        },
        {
          title: "Factory post 2",
          date: "Thu Feb 14 2013 18:09:07 GMT+0000 (GMT)",
          tags: ["tag1", "tag3", "tag2"]
        }
      ]
    },
    {
      title: "tag3",
      slug: "tag3",
      posts: [
        {
          title: "Factory post 2",
          date: "Thu Feb 14 2013 18:09:07 GMT+0000 (GMT)",
          tags: ["tag1", "tag3", "tag2"]
        }
      ]
    }
  ]
};
