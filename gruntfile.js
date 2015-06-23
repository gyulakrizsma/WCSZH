module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: "public/lib",
                    layout: "byComponent",
                    cleanTargetDir: false
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "public/stylesheets/style.css": "public/stylesheets/style.less" // destination file and source file
                }
            }
        },
        watch: {
            styles: {
                files: ['public/stylesheets/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);

    grunt.loadNpmTasks('grunt-bower-task');
};