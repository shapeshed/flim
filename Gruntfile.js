module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
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
    mochaTest: {
      all: {
        src: 'test/**/*.js'
      }
    },
    watch: {
      gruntfile: {
        files: ['<%= jshint.files %>'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('build', ['jshint', 'mochaTest']);

};
