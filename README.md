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
		config: {
		},
		output: 'public/assets/app.js',
		cleans: [
		],
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
			'assets/css/a.css',
			'assets/css/b.css',
		],
		output: 'results/app.css',
	})
	.watch('assets/css/**/*.css')
```

ファイルパターンでも指定できます。

```javascript
drinkbar
	.task('style:app')
	.styles({
		inputs: [
			'assets/css/*.css',
		],
		output: 'results/app.css',
	})
	.watch('assets/css/**/*.css')
```

### scripts

複数のスクリプトを１つのファイルに生成します。
Concatenates scripts and saves the output

```javascript
drinkbar
	.task('script:app')
	.scripts({
		inputs: [
			'assets/js/a.js',
			'assets/js/b.js',
			'assets/js/c.js',
		],
		output: 'public/assets/app.js',
	})
	.watch('assets/js/**/*.js')
```

ファイルパターンでも指定できます。

```javascript
drinkbar
	.task('script:app')
	.scripts({
		inputs: [
			'assets/js/*.js',
		],
		output: 'results/app.js',
	})
	.watch('assets/js/**/*.js')
```

### browserify

`browserify`を使ってスクリプトを１つのファイルに生成します。
Combine scripts use `browserify`.

```javascript
drinkbar
	.task('script:app')
	.browserify({
		inputs: [
			'assets/browserify/a.js',
			'assets/browserify/b.js',
		],
		output: 'results/app.js',
		config: {
		},
	})
	.watch('resources/assets/js/**/*.js')
```

### pug
Pug (jade) テンプレートをコンパイルします。
Compile your Pug (or jade) templates into HTML or JS.
```javascript
drinkbar
	.task('pug')
	.pug({
		inputs: [
			'assets/pug/a.jade',
			'assets/pug/b.jade',
		],
		output: 'results/html',
	})
```
### stylus

### sass

sassファイルのコンパイル

コンパスには対応していません。
`Compass` is not available.

```javascript
drinkbar
	.task('style:app')
	.sass({
		inputs: [
			'assets/sass/app.scss',
		],
		output: 'results/app.css',
		config: {
		},
	})
	.watch('assets/sass/**/*.scss')
```

### less

lessファイルのコンパイル
Pre-process less.

```javascript
drinkbar
	.task('style:app')
	.less({
		inputs: [
			'assets/less/app.less',
		],
		output: 'less/app.css',
		config: {
		},
	})
	.watch('assets/less/**/*.less')
```

### coffeescript
```javascript
drinkbar
	.task('coffeescript')
	.coffeescript({
		inputs: [
			'assets/coffeescript/a.coffee',
			'assets/coffeescript/b.coffee',
		],
		output: 'results/coffeescript',
	})
```

### typescript

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
	.task('scripts', ['script:libs', 'script:app'])
	.define()
```

## 入力ファイルの指定方法

inputとする場合、一つのファイルをタスクに渡すことができます。
input passes one file to task.
```javascript
input: [
			'assets/test-1/a.css',
		],
```
inputsでは複数ファイルを配列で渡すことができます。
inputs pass multiple files to task by using array.
```javascript
inputs: [
			'assets/test-1/b.css',
			'assets/test-1/c.css',
		],
```
ファイルをファイルパターン（グロブ）で指定することも可能です。
```javascript
'assets/test-1/**/*.css'
```


## methods

### drinkbar.task(task : string, dependentTasks : array) : TaskBuilder

### TaskBuilder#{recipe}() : TaskBuilder

### TaskBuilder#define() : TaskBuilder

空のタスクを作成します。

`drinkbar.task()` に依存タスクが指定されている場合、

### TaskBuilder#before(callback : function) : TaskBuilder

### TaskBuilder#after(callback : function) : TaskBuilder

### TaskBuilder#watch(patterns : array) : TaskBuilder
