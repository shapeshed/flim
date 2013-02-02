#!/usr/bin/env node
var rimraf = require('rimraf'),
  fs = require('fs'),
  parser = require('../lib/parser'),
  Generator = require('../lib/generator');

var arguments = process.argv.splice(2);

if (arguments[0] === "generate") {
  rimraf('./build', function (err) {
    fs.mkdir('./build', function (err, mkdir) {
      if (err) { throw err; }
      parser.init('./src/_posts/', function (err, data) {
        var generator = new Generator(data);
        generator.init();
      });
    });
  });
}


