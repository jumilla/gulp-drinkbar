# gulp-drinkbar

## overview

gulp-drinkbarは、Gulpタスクをシンプルに見やすく記述できます。

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
	.on('after', function () {
		drinkbar.notify('Build finished.')
		drinkbar.log('Build finished.')
	})
```

## Getting Started

You need to install node.js v0.12 or later
node.js v0.12以降の動作環境が必要です。

```
npm install gulp-drinkbar --save-dev
```


## Commands

使い慣れている `gulp` コマンドをそのまま使用します。

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



## Task definition

Gulpタスクは `gulpfile.js` に記述します。

```javascript

var drinkbar = require('gulp-drinkbar')

drinkbar
	.task(***taskname***)
	.***recipe***({})
```

`.recipe()` には、後述するレシピ関数を指定します。
レシピ関数にはオブジェクト形式でパラメーターを指定できます。

ES2015で記述したい場合は、`.babelrc` ファイルを用意し、`gulpfile.js` ではなく `gulpfile.babel.js` というファイル名にします。

```javascript

import drinkbar from 'gulp-drinkbar'

drinkbar
	.task(***taskname***)
	.***recipe***({})
```

### 入力ファイルの指定方法

レシピ関数のパラメーターに入力ファイルパスを指定する方法は2つあります。

単一ファイルパスもしくはファイルパターンを指定するには、.inputを使います。
.input passes one file to task.

```javascript
{
	input: 'assets/test-1/a.css',
},
```

複数ファイルパスもしくはファイルパターンを指定するには、.inputsを使います。
.inputs pass multiple files to task by using array.

```javascript
{
	inputs: [
		'assets/test-1/b.css',
		'assets/test-1/c.css',
	],
}
```
 
ファイルをファイルパターン（Glob形式）で指定することもできます。

```javascript
{
	inputs: [
		'assets/test-1/**/*.css'
	],
}
```

### task group

タスクグループの定義の方法
Define task group.

```javascript
drinkbar
	.task('scripts', ['script:libs', 'script:app'])
	.define()
```  		  

## Recipes

指定したgulpタスクで行わせるよくある処理を関数化したものを、レシピと呼んでいます。

レシピには、指定したソースファイルリストの一つ一つに対して処理を行わせる「変換レシピ」と、指定したソースファイルリストから一つのファイルを生成する「結合レシピ」があります。

### copy

ファイルを単純にコピーするレシピです。

```javascript
drinkbar
	.task('bootstrap3')
	.copy({
		inputs: [
			'resources/assets/css/bootstrap.min.css',
			'resources/assets/js/bootstrap.min.js',
		],
		output: 'public/assets',
	})
	.watch('resources/assets/*/bootstrap.*')
```

- Recipe Type: 変換レシピ
- Parameters:
  - inputs/input: 入力ファイルパスリスト
  - output: 出力先ディレクトリパス
  - config: 設定

### pug (jade)

pug (jade)ファイルをビルドするレシピです。

```javascript
drinkbar
	.task('bootstrap3')
	.pug({
		inputs: [
			'src/index.jade',
		],
		output: 'public',
	})
	.watch('src/**/*.+(pug|jade)')
```

- Recipe Type: 変換レシピ
- Parameters:
  - inputs/input: 入力ファイルパスリスト
  - output: 出力先ディレクトリパス
  - config: 設定

### stylus

Stylusファイルをビルドするレシピです。

```javascript
drinkbar
	.task('style:app')
	.stylus({
		inputs: [
			'resources/assets/app.styl',
		],
		output: 'public/assets',
	})
	.watch('src/**/*.styl')
```

- Recipe Type: 変換レシピ
- Parameters:
  - inputs/input: 入力ファイルパスリスト
  - output: 出力先ディレクトリパス
  - config: 設定

### sass

sasssファイルのコンパイル
Pre-process sass.

`Compass` には対応していません。
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

### less

lessファイルのコンパイル
Pre-process less.

```javascript
drinkbar
	.task('style:app')
	.less({
		inputs: [
			'resources/assets/less/app.less',
		],
		output: 'public/assets/app.css',
		config: {
		},
	})
	.watch('resources/assets/less/**/*.less')
```

### babel

### coffeescript

### typescript

### json5

### cson

### yaml

### styles

複数のスタイルシートを １つのファイルに生成します。
Concatenates style sheets and saves the output.

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

ファイルパターン (Glob) でも指定できます。
Can file pattern (Glob) specified.

```javascript
drinkbar
	.task('style:app')
	.styles({
		inputs: [
			'resources/assets/css/*.css',
		],
		output: 'public/assets/app.css',
	})
	.watch('resources/assets/css/**/*.css')
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

ファイルパターンでも指定できます。

```javascript
drinkbar
	.task('script:app')
	.scripts({
		inputs: [
			'resources/assets/js/*.js',
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

## Methods

### drinkbar.task(task : string, dependentTasks : array) : TaskBuilder

### TaskBuilder#{recipe}() : TaskBuilder

### TaskBuilder#define() : TaskBuilder

空のタスクを作成します。

`drinkbar.task()` に依存タスクが指定されている場合、

### TaskBuilder#on('before', callback : function) : TaskBuilder

### TaskBuilder#on('after', callback : function) : TaskBuilder

### TaskBuilder#watch(patterns : array) : TaskBuilder

### drinkbar.notify(message : string, title : string) : void

### drinkbar.log(message : string) : void

