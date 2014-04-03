# grunt-sizediff

> Diff file sizes between current git branch and a branch/commit.  
> It helps you keep an eye on your project size changes.

![screenshot](screenshot.png)


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```bash
$ npm install grunt-sizediff --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sizediff');
```

*Tip: the [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) module makes it easier to load multiple grunt tasks.*


[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Documentation

You can specify two files to diff and an optional target.


### Example usage


#### Diff

```js
sizediff: {
	dist: {
		src: [
			'file.js',
			'file.min.js' // optional
		]
	}
}
```

It falls back to `master` if `target` is not specified.


#### Diff against branch

```javascript
sizediff: {
	dist: {
		options: {
			target: 'future' // branch
		},
		src: [
			'file.js',
			'file.min.js'
		]
	}
}
```


#### Diff against commit

```js
sizediff: {
	dist: {
		options: {
			target: 'fd9b092' // commit
		},
		src: [
			'file.js',
			'file.min.js'
		]
	}
}
```

#### Override target

You can temporarily override the diff target of a task by running `grunt sizediff:dist:target`, where `dist` is the task target you want to override and `target` is the branch or commit.


## Tests

Grunt currently doesn't have a way to test tasks directly. You can test this task by running `grunt` and manually verify that it works.


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
