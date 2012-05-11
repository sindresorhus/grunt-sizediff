/*
 * grunt-sizediff
 * 0.1.0 - 2012-05-09
 * github.com/sindresorhus/grunt-sizediff
 *
 * (c) Sindre Sorhus
 * sindresorhus.com
 * MIT License
 */
module.exports = function( grunt ) {
	'use strict';

	function gzip( item ) {
		return grunt.helper( 'gzip', item );
	}

	var log = grunt.log;
	var file = grunt.file;
	var async = grunt.utils.async;
	var _ = grunt.utils._;

	grunt.registerMultiTask('sizediff', 'Diff file sizes between current git branch and a branch/commit', function( targetOverride ) {
		var done = this.async();
		var files = grunt.file.expandFiles( this.data.files );
		var target = targetOverride || this.data.target || 'master';

		function getSizes( item, cb ) {
			grunt.utils.spawn({
				cmd: 'git',
				args: [ 'show', target + ':./' + item ]
			}, function( err, result ) {
				cb( err, {
					filename: item,
					current: file.read( item ),
					target: result.stdout
				});
			});
		}

		async.parallel([
			function( cb ) {
				getSizes( files[0], cb );
			},
			function( cb ) {
				getSizes( files[1], cb );
			}
		], function( err, results ) {
			var min = results[1];

			if ( err ) {
				grunt.fatal( err );
			}

			// Add gzip version to the collection
			results.push({
				filename: min.filename + '.gz',
				current: gzip( min.current ),
				target: gzip( min.target )
			});

			log.writeln( '\nSize diff between current branch and ' + target.bold );

			results.forEach(function( item ) {
				var current = item.current.length;
				var target = item.target.length;
				var diff = current - target;
				var color = diff < 0 ? 'green' : diff > 0 ? 'red' : 'grey';

				if ( diff > 0 ) {
					diff = '+' + diff;
				}

				log.writetableln([ 12, 12, 55 ], [
					_.lpad( current += '', 10 ),
					_.lpad( diff ? '(' + diff + ')' : '(-)', 10 )[ color ],
					item.filename
				]);
			});

			done();
		});
	});
};