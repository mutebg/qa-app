module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            development: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'sass/main.scss',
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 5 versions']
            },
            main: {
                expand: true,
                flatten: true,
                src: 'css/*.css',
                dest: 'css/'
            }
        },

        watch: {
            styles: {
                files: ['sass/*', 'sass/_parts/*'],
                tasks: ['sass', 'autoprefixer']
            }
        },
    });

    grunt.registerTask('gsass', ['sass']);
    grunt.registerTask('auto', ['watch']);
    grunt.registerTask('default', ['watch']);
};