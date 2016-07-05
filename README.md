# gulp-drinkbar

## overview


```javascript
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


## Getting Started

You need to install node ver. 4.4.56(v8) or later
node ver. 4.4.56(v8)以降の動作環境が必要です。
```
npm install gulp-drinkbar --save-dev
```


## Commands

### `gulp`

`.css`と`.js`を生成するタスクでは、sourcemapも生成します。
if your task includes compiling .css and/or .js file, additional sourcemap will be generated.


### `gulp --production`

`default`タスクを実行します。
it runs default task

.cssを生成するタスクでは、minifyを実行します。
it runs minify files when the task includes compiling .css file.

.jsを生成するタスクでは、uglifyを実行します。
it runs uglify files when the task includes compiling .js file

### `gulp <task>`

指定したgulpタスクを実行します。
it runs specific task

### `gulp watch`

タスクに指定されたファイルパターンを監視し、変更を検知した時点でタスクを実行します。
As you write code and modify your files, the `gulp.watch()` method will listen for changes and automatically run designated tasks.

## recipes

### styles

複数のスタイルシートを１つのファイルに生成します。
Concatenates style sheets and saves the output

```javascript
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


Pre-process sass.

コンパスには対応していません。
`Compass` is not available.

```javascript
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

複数のスクリプトを１つのファイルに生成します。
Concatenates scripts and saves the output

```javascript
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

`browserify`を使ってスクリプトを１つのファイルに生成します。
Combine scripts use `browserify`.

```javascript
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
指定のフォルダ、ファイルを削除します。
Erase designated files and/or directories
```javascript
drinkbar
	.task('scripts')
	.erase('resources/assets/js/app.js')
```

### task group

タスクグループの定義の方法
Define task group.

```javascript
drinkbar
	.task('scripts', ['script:libs', 'script:'app'])
	.define()
```

## methods

### drinkbar.task(task : string, dependentTasks : array) : TaskBuilder

### TaskBuilder#watch(patterns : array) : TaskBuilder


### TaskBuilder#define() : TaskBuilder

