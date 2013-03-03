#!/usr/bin/env node
var flim = require("../lib/flim"),
  args = process.argv.slice(2);

flim.init(function(err, data) {
  if (err) { throw err; }
});
