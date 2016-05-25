'use strict';
var path = require('path');
var gzipjs = require('gzip-js');
var prettyBytes = require('pretty-bytes');
var async = require('async');
var lpad = require('lpad');
var chalk = require('chalk');

module.exports = function (grunt) {
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

		async.parallel(parallelFns, function (err, results) {
			// use second file if defined, otherwise the first
			var min = results[1] || results[0];

			if (err) {
				grunt.warn(err);
				cb();
				return;
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
				var percent = ((diff / current) * 100).toFixed();
				var color = 'gray';

				if (diff > 0) {
					color = 'red';
					diff = '+' + prettyBytes(diff);
				} else if (diff < 0) {
					color = 'green';
					diff = prettyBytes(diff);
				}

				grunt.log.writetableln([12, 24, 55], [
					lpad(prettyBytes(current), ' ', 10),
					lpad(chalk[color](diff ? '(' + diff + ', ' + percent + '%)' : '(-)'), ' ', 10),
					item.filename
				]);
			});

			cb();
		});
	});
};
