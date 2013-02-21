module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'lib/**/*.js',
        'package.json',
        'test/**/*.js',
        '.jshintrc'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    simplemocha: {
      all: {
        src: 'test/**/*.js'
      }
    },
    watch: {
      gruntfile: {
        files: ['<%= jshint.files %>'],
        tasks: ['simplemocha:all']
      }
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', 'simplemocha');

};
