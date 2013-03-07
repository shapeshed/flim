# Flim

[![Build Status](https://secure.travis-ci.org/shapeshed/flim.png)](http://travis-ci.org/shapeshed/flim)

Flim is a lightweight static page generator for bloggers. 

## Installation

    npm install flim

## Opinions

* Do one thing and do it well. 
* Be fast
* Be small and nimble
* Delegate build tasks and to other modules / tools.
* Be friendly to JavaScript data types
* Highlight.js is better than Pygments
* JSON not YAML

The examples directory should give you a feel for this. 

## Usage

Programtic use

    var flim = require('flim');
    flim.init(function(err, data) {
      if (err) { throw err };
    }); 

Command line use (assuming global install)

    flim generate

## Folder Structure

Flim expects sites to have a `src` folder containing `_layouts` and `_posts` folders.

    src
    ├── _layouts
    │   ├── index.jade
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
    ├── index.html
    ├── post-1
    │   └── index.html
    ├── post-2
    │   └── index.html
    ├── post-3
        └── index.html
    ├── sitemap.xml
    └── tags
        ├── tag1
        │   └── index.html
        ├── tag2
        │   └── index.html

## Configuration

You can customise flim using a `.flimrc` file in the root of your flim site. This is JSON with the following options.

    {
      "site_name": "A flim site",
      "src_dir": "./src",
      "build_dir": "./build",
      "tags": {
        "tags_dir": "tags",
        "template": "./src/_layouts/tag.jade"
      },
      "pages": {
        "index": {
          "title": "Home",
          "meta": {
            "description": "My description",
            "keywords": "foo, bar, baz"
          },
          "template": "./src/_layouts/index.jade"
        },
        "posts": {
          "template": "./src/_layouts/post.jade"
        }
      }
    }

## Posts Structure

Posts are written using vanilla markdown and use JSON for metadata. GitHub markdown is supported.

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

Flim delegates build tasks other than generating pages to other tools since you know best how you want to build and dpeloy your site. A Makefile or [Grunt][2] are recommended for copying files, minification and deployment. 

[1]: https://github.com/mojombo/jekyll
[2]: http://gruntjs.com/
[3]: http://0.0.0.0:3000
