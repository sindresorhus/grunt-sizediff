'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		sizediff: {
			dist: {
				options: {
					target: 'a356cb4'
				},
				src: [
					'test/fixtures/test.js',
					'test/fixtures/test.min.js'
				]
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['sizediff']);
};
