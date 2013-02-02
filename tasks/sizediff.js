'use strict';
module.exports = function (grunt) {
	var path = require('path');
	var gzipjs = require('gzip-js');
	var filesize = require('filesize');
	var _ = grunt.util._;

	grunt.registerMultiTask('sizediff', 'Diff file sizes between current git branch and a branch/commit', function (targetOverride) {
		var cb = this.async();
		var files = this.filesSrc;
		var target = targetOverride || this.options({target: 'master'}).target;
		var parallelFns = [
			function (cb) {
				getSizes(files[0], cb);
			}
		];

		function getSizes(el, cb) {
			grunt.util.spawn({
				cmd: 'git',
				args: ['show', target + ':./' + el]
			}, function (err, result) {
				cb(err, {
					path: path.dirname(el),
					filename: path.basename(el),
					current: grunt.file.read(el),
					target: result.stdout
				});
			});
		}

		// handle optional second file
		if (files.length > 1) {
			parallelFns.push(
				function (cb) {
					getSizes(files[1], cb);
				}
			);
		}

		grunt.util.async.parallel(parallelFns, function (err, results) {
			// use second file if defined, otherwise the first
			var min = results[1] || results[0];

			if (err) {
				grunt.warn(err);
			}

			console.log('\nPath %s', results[0].path.cyan);

			// add gzip version to the collection
			results.push({
				filename: min.filename + '.gz',
				current: gzipjs.zip(min.current, {}),
				target: gzipjs.zip(min.target, {})
			});

			grunt.log.writeln('\nSize diff between current branch and ' + target.bold);

			results.forEach(function (item) {
				var current = item.current.length;
				var target = item.target.length;
				var diff = current - target;
				var color = 'grey';

				if (diff > 0) {
					color = 'red';
					diff = '+' + filesize(diff, true);
				} else if (diff < 0) {
					color = 'green';
					diff = '-' + filesize(Math.abs(diff), true);
				}

				grunt.log.writetableln([12, 12, 55], [
					_.lpad(filesize(current, true), 10),
					_.lpad(diff ? '(' + diff + ')' : '(-)', 10 )[color],
					item.filename
				]);
			});

			cb();
		});
	});
};
