# grunt-sizediff

[Grunt][grunt] task to diff file sizes between current git branch and a branch/commit


## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-sizediff`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-sizediff');
```


## Documentation

You can specify two files to diff and an optional target.


### Example usage


#### Diff

```javascript
sizediff: {
	dist: {
		files: [
			'test.js',
			'test.min.js'
		]
	}
}
```

It falls back to `master` if `target` is not specified.


#### Diff against branch

```javascript
sizediff: {
	dist: {
		files: [
			'test.js',
			'test.min.js'
		],
		target: 'future' // branch
	}
}
```


#### Diff against branch

```javascript
sizediff: {
	dist: {
		files: [
			'test.js',
			'test.min.js'
		],
		target: 'fd9b092' // commit
	}
}


## Tests

Grunt currently doesn't have a way to test tasks directly. You can test this task by running `grunt` and manually check that it works.


## Contribute

In lieu of a formal styleguide, take care to maintain the existing coding style.


## License

MIT License
(c) [Sindre Sorhus](http://sindresorhus.com)


[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md