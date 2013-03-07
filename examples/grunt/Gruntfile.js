var flim = require('flim');

module.exports = function(grunt) {
  grunt.initConfig({

    connect: {
      server: {
        options: {
          base: './build',
          keepalive: true
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['**', '!_**/**'], dest: 'build/'}
        ]
      }
    }

  });

  grunt.registerTask('flim', 'Generate flim pages', function() {
    flim.init(function(err, data) {
      if (err) { throw err; }
    });
  });

  grunt.registerTask('build', ['flim', 'copy'] );

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

};
