# Flim

[![Build Status](https://secure.travis-ci.org/shapeshed/flim.png)](http://travis-ci.org/shapeshed/flim)

Flim is an opinionated, lightweight static blog generator. It takes much of its inspiration from [Jekyll][1] and favours convention over configuration.

## Installation

    npm install flim

## Getting started

To get started you can clone an example flim site at 

    npm install
    npm install -g grunt-cli
    grunt build
    grunt server

Open a browser at [http://0.0.0.0:3000][3].

## Folder Structure

Flim expects sites to have a `src` folder containing `_layouts` and `_posts` folders.

    src
    ├── _layouts
    │   ├── archive.jade
    │   ├── layout.jade
    │   ├── post.jade
    │   └── tag.jade
    └── _posts
        ├── post-1.md
        ├── post-2.md
        ├── post-3.md

## Generated structure

Flim generates into a `build` folder. Flim is opinionated about the structure of the site that is generated

    build
    ├── atom.xml
    ├── archive
    │   └── index.html
    ├── index.html
    ├── post-1
    │   └── index.html
    ├── post-2
    │   └── index.html
    ├── post-3
        └── index.html

## Posts Structure

Posts are written using vanilla markdown and use JSON for metadata.

    {
      "layout": "post",
      "title": "Praesent urna lectus",
      "description": "Lorum dorum ipsum",
      "date": "Thu Jan 24 2013 16:32:12 GMT+0000 (GMT)",
      "tags": ["alpha", "beta", "gamma"]
    }

    # Praesent urna lectus

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a sapien quam. Vestibulum rutrum mauris sed nisl condimentum sed tempus metus pulvinar. Donec porta suscipit arcu ut hendrerit. Proin lobortis sodales metus, id pretium dui ultrices ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 

## Tasks 

Flim delegates tasks to other tools. Example [Grunt][2] tasks are below although flim is agnostic to this. 

### Site Generation

Generate a site

    var flim = require('flim');
    flim.init('/your/project/path', function(err, data) {
    }); 
    
### Copying assets

Copy assets from your `src` to `build` folder.

### Watching files

Watch `src` files regenerating if there is a change.

## Why the name flim?

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F4825006&amp;color=ff6600&amp;auto_play=false&amp;show_artwork=false"></iframe>

[1]: https://github.com/mojombo/jekyll
[2]: http://gruntjs.com/
[3]: http://0.0.0.0:3000
