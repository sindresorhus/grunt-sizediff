[![build status](https://secure.travis-ci.org/sindresorhus/grunt-sizediff.png)](http://travis-ci.org/sindresorhus/grunt-sizediff)
# grunt-sizediff

[Grunt][grunt] task to diff file sizes between current git branch and a branch/commit. It helps you keep an eye on your project size changes.

![screenshot](https://raw.github.com/sindresorhus/grunt-sizediff/master/screenshot.png)


## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-sizediff`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-sizediff');
```


## Documentation

This grunt task is a [multi task](https://github.com/cowboy/grunt/blob/master/docs/types_of_tasks.md#multi-tasks-%E2%9A%91), which means you can specify multiple subtasks and grunt will iterate over them. The `dist` below is a subtask, you could e.g. create a `dev` subtask to handle stuff while developing.

You can specify two files to diff and an optional target.


### Example usage


#### Diff

```javascript
sizediff: {
	dist: {
		files: [
			'file.js',
			'file.min.js'
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
			'file.js',
			'file.min.js'
		],
		target: 'future' // branch
	}
}
```


#### Diff against commit

```javascript
sizediff: {
	dist: {
		files: [
			'file.js',
			'file.min.js'
		],
		target: 'fd9b092' // commit
	}
}
```

#### Override target

You can temporarily override the diff target of a task by running `grunt sizediff:dist:target`, where `dist` is the task you want to override and `target` is the branch or commit.


## Tests

Grunt currently doesn't have a way to test tasks directly. You can test this task by running `grunt` and manually verify that it works.


## Contribute

In lieu of a formal styleguide, take care to maintain the existing coding style.


## License

MIT License
(c) [Sindre Sorhus](http://sindresorhus.com)


[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md