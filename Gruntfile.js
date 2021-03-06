// Load Grunt
module.exports = function (grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      // Tasks
      sass: { // Begin Sass Plugin
        dist: {
          options: {
            sourcemap: 'none'
          },
          files: [{
            expand: true,
            cwd: 'sass',
            src: ['**/*.scss'],
            dest: 'css',
            ext: '.css'
        }]
        }
      },
      postcss: { // Begin Post CSS Plugin
        options: {
          map: false,
          processors: [
        require('autoprefixer')({
              browsers: ['last 2 versions']
            })
      ]
        },
        dist: {
          src: 'css/style.css'
        }
      },
      cssmin: { // Begin CSS Minify Plugin
        target: {
          files: [{
            expand: true,
            cwd: 'css',
            src: ['*.css', '!*.min.css'],
            dest: 'css',
            ext: '.min.css'
      }]
        }
      },
      babel: {
        options: {
          sourceMap: true
        },
        dist: {
          files: {
            "js/bundle.js": "src/script.js"
          }
        }
      },
      uglify: { // Begin JS Uglify Plugin
        build: {
          src: ['js/bundle.js'],
          dest: 'js/script.min.js'
        }
      },
      watch: { // Compile everything into one task with Watch Plugin
        css: {
          files: '**/*.scss',
          tasks: ['sass', 'postcss', 'cssmin']
        },
        js: {
          files: '**/script.js',
          tasks: ['babel','uglify']
        }
      }
    });
    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
  
    // Register Grunt tasks
    grunt.registerTask('default', ['watch']);
  };