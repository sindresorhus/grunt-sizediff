module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		sizediff: {
			dist: {
				files: [
					'test/fixtures/test.js',
					'test/fixtures/test.min.js'
				],
				target: 'a356cb4'
			}
		},
		lint: {
			files: [
				'grunt.js',
				'tasks/**/*.js'
			]
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'default'
		},
		jshint: {
			options: {
				es5: true,
				esnext: true,
				bitwise: true,
				curly: true,
				eqeqeq: true,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				regexp: true,
				undef: true,
				strict: true,
				trailing: true,
				smarttabs: true,
				node: true
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask( 'default', 'lint sizediff' );

};