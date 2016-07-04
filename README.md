# gulp-drinkbar

## overview


```
var drinkbar = require('gulp-drinkbar')

drinkbar
	.task('script:app')
	.scripts({
		inputs: [
			'resources/assets/js/app.js',
		],
		output: 'public/assets/app.js',
		config: {
		},
	})
	.watch('resources/assets/js/**/*.js')

drinkbar
	.task('scripts', ['script:app'])
	.define()

drinkbar
	.task('default', ['scripts'])
	.define()

```


## installation

```
npm install gulp-drinkbar --save-dev
```

## commands

### `gulp`

.cssと.jsを生成するタスクでは、sourcemapも生成します。

### `gulp --production`

`default`タスクを実行します。

.cssを生成するタスクでは、minifyを実行します。

.jsを生成するタスクでは、uglifyを実行します。

### `gulp <task>`

指定したgulpタスクを実行します。

### `gulp watch`

タスクに指定されたファイルパターンを監視し、変更を検知した時点でタスクを実行します。

## recipes

### styles

Combine style sheets.

```
drinkbar
	.task('style:app')
	.styles({
		inputs: [
			'resources/assets/css/bootstrap.css',
			'resources/assets/css/app.css',
		],
		output: 'public/assets/app.css',
	})
	.watch('resources/assets/css/**/*.css')
```

### sass

Pre process sass.

`Compass` is not available.

```
drinkbar
	.task('style:app')
	.sass({
		inputs: [
			'resources/assets/sass/app.scss',
		],
		output: 'public/assets/app.css',
		config: {
		},
	})
	.watch('resources/assets/sass/**/*.scss')
```

### scripts

Combine scripts.

```
drinkbar
	.task('script:app')
	.scripts({
		inputs: [
			'resources/assets/js/jquery.js',
			'resources/assets/js/bootstrap.js',
			'resources/assets/js/app.js',
		],
		output: 'public/assets/app.js',
	})
	.watch('resources/assets/js/**/*.js')
```

### browserify

Combine scripts use `browserify`.

```
drinkbar
	.task('script:app')
	.browserify({
		inputs: [
			'resources/assets/js/app.js',
		],
		output: 'public/assets/app.js',
		config: {
		},
	})
	.watch('resources/assets/js/**/*.js')
```

### erase

### task group

Define task group.

```
drinkbar
	.task('scripts', ['script:libs', 'script:'app'])
	.define()
```

## methods

### drinkbar.task(task : string, dependentTasks : array) : TaskBuilder

### TaskBuilder#watch(patterns : array) : TaskBuilder

### TaskBuilder#define() : TaskBuilder

