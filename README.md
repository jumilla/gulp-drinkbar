# gulp-drinkbar

## Overview

gulp-drinkbarは、Gulpタスクをシンプルに見やすく記述できます。
gulp-drinkbar helps write gulp tasks more simple and easier to read.

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

gulp-drinkbarの動作環境は次の通りです。
gulp-drinkbar requires are below...

| Module        | Version       |
| ------------- | ------------- |
| Node.js       | >= 0.12       |
| gulp          | >= 3.9        |

### Installation

[1] Install `gulp` on global and local.

```
npm install -g gulp
npm install gulp --save-dev
```

[2] Install `gulp-drinkbar`.

```
npm install gulp-drinkbar --save-dev
```

### Minimum example

[1] make `gulpfile.js`.

```javascript

var drinkbar = require('gulp-drinkbar')

drinkbar
	.task('default')
	.define()
```

[2] Run command `gulp`.

That's OK!

## Commands

あたなが使い慣れている `gulp` コマンドをそのまま使用できます。
gulp commands are used in gulp-drinkbar

### `gulp`

`.css`と`.js`を生成するタスクでは、sourcemapも生成します。
Additional sourcemap will be generated if your task includes compiling .css and/or .js file, a


### `gulp --production`

`default`タスクを実行します。
It runs `default` task

.cssを生成するタスクでは、minifyを実行します。
It runs minify files when the task includes compiling .css file.

.jsを生成するタスクでは、uglifyを実行します。
It runs uglify files when the task includes compiling .js file.

### `gulp <task>`

`<task>`で指定したgulpタスクを実行します。
It runs specific <task>.

### `gulp watch`

タスクに指定されたファイルパターンを監視し、変更を検知した時点でタスクを実行します。
As you write code and modify your files, this command will listen for changes and automatically run designated tasks.



## Task Definition

Gulpタスクは `gulpfile.js` に記述します。
Your gulp tasks are written in `gulpfile.js`

```javascript

var drinkbar = require('gulp-drinkbar')

drinkbar
	.task(<taskname>)
	.<recipe>({})
```

`.<recipe>()` には、後述するレシピ関数を指定します。
レシピ関数にはオブジェクト形式でパラメーターを指定できます。

You can put designated functions (described in the recipe section below) in `.<recipe>()` block. 

ES2015で記述したい場合は、`.babelrc` ファイルを用意し、`gulpfile.js` の代わりに `gulpfile.babel.js` というファイル名を使います。

If you write task by using ES2015, it needs to be written in `.babelrc` file. And rename the `gulpfile.js` to `gulpfile.bable.js`.

#### .bablerc

```json
{
  "presets": ["es2015"]
}
```

```javascript

import drinkbar from 'gulp-drinkbar'

drinkbar
	.task(***taskname***)
	.***recipe***({})
```
| (need this?)


### Passing File Path
 入力ファイルの指定方法

レシピ関数のパラメーターに入力ファイルパスを指定する方法は2つあります。
You can pass file paths to parameter in two ways.

単一ファイルパスもしくはファイルパターンを指定するには、.inputを使います。
To pass one file or file pattern to task, use `input:`.

```javascript
{
	input: 'assets/test-1/a.css',
},
```

複数ファイルパスもしくはファイルパターンを指定するには、.inputsを使います。
To pass multiple files or file patterns, use `inputs:`.

```javascript
{
	inputs: [
		'assets/test-1/b.css',
		'assets/test-1/c.css',
	],
}
```
 
ファイルをファイルパターン（Glob形式）で指定することもできます。
Wildcard (Glob) can be used to specify file pattern.

```javascript
{
	inputs: [
		'assets/test-1/**/*.css'
	],
}
```

### Task Group

タスクグループの定義の方法
To define task group.

```javascript
drinkbar
	.task('scripts', ['script:libs', 'script:app'])
	.define()
```  		  

## Recipes

指定したgulpタスクで行わせるよくある処理を関数化したものを、レシピと呼んでいます。

Recipes are functions that includes gulp tasks used frequently. 

レシピには、指定したソースファイルリストの一つ一つに対して処理を行わせる「変換レシピ」と、指定したソースファイルリストから一つのファイルを生成する「結合レシピ」、その他ファイルを生成しない「作業レシピ」があります。

Recipes include "compiling" which compile selected file, "concatenating" files, and "work".

### copy

ファイルを単純にコピーするレシピです。
To copy file.

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
	.watch('resources/assets/**/bootstrap.*')
```

- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of input directory path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### pug (jade)

pug (jade)ファイルをビルドするレシピです。
To compile pug (jade) file.

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

- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of input path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### stylus

Stylusファイルをビルドするレシピです。
To compile stylus file.

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

- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### Sass

Sasssファイルのコンパイル
To complie Sass file.

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
- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### less

lessファイルのコンパイル
To compile less file.

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
- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### babel

babelファイルのコンパイル
To compile bable file.

```javascript
.babel({
		inputs: [
			'assets/test-6/a.es6',
		],
		output: 'results/test-6',
	})
```
- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### coffeescript

To compile coffeescript file

```javascript
.coffeescript({
		inputs: [
			'assets/test-7/a.coffee',
			'assets/test-7/b.coffee',
		],
		output: 'results/test-7',
	})
```
- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### typescript

To compile typescript file

```javascript
.typescript({
		inputs: [
			'assets/test-8/a.ts',
			'assets/test-8/b.ts',
		],
		output: 'results/test-8',
	})
```
- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### json5

To compile jason5 file

```javascript
.json5({
		input: 'assets/test-14/config.json5',
		output: 'results/test-14',
	})
```
- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### cson

To compile cson file.

```javascript
.cson({
		input: 'assets/test-15/config.cson',
		output: 'results/test-15',
	})
```
- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### yaml

To compile yaml file.

```javascript
.yaml({
		input: 'assets/test-16/config.yaml',
		output: 'results/test-16',
	})
```
- Recipe Type: 変換レシピ (compiling)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### styles

複数のスタイルシートを １つのファイルに生成します。
To concatenates style sheets and saves the output.

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
- Recipe Type: 結合レシピ (concatenating)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### scripts

複数のスクリプトを１つのファイルに生成します。
To concatenates scripts and saves the output

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
- Recipe Type: 結合レシピ (concatenating)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### browserify

`browserify`を使ってスクリプトを１つのファイルに生成します。
To combine scripts into one by using `browserify`.

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

- Recipe Type: 結合レシピ (concatenating)
- Parameters:
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - output: 出力先ディレクトリパス (output directory)
  - config: 設定

### clean

指定のフォルダ、ファイルを削除します。
To erase designated files and/or directories

```javascript
drinkbar
	.task('scripts:clean')
	.clean('resources/assets/js/app.js')
```

- Recipe Type: 作業レシピ (working)
- Parameters: string / array[string]: 入力ファイルパス (list of inputs path(s))

### browsersync

ブラウザ
To erase designated files and/or directories

```javascript
drinkbar
	.task('serve')
	.browsersync({
		input: 'public/**/*',
		config: {
			server: 'public',
		},
	})
```

- Recipe Type: 作業レシピ (working)
- Require npm modules:
  - `browser-sync`
- Parameters: object
  - inputs/input: 入力ファイルパスリスト (list of inputs path(s))
  - config: 設定
    - [Options](https://browsersync.io/docs/options)



## Methods

### drinkbar.task(task : string, dependentTasks : array) : TaskBuilder

### TaskBuilder#{recipe}(...parameters) : TaskBuilder

### TaskBuilder#define(closure : function($, builder, ...parameters) = null) : TaskBuilder

空のタスクを作成します。

`drinkbar.task()` に依存タスクが指定されている場合、

### TaskBuilder#on('before', callback : function) : TaskBuilder

### TaskBuilder#on('after', callback : function) : TaskBuilder

### TaskBuilder#watch(patterns : array) : TaskBuilder

### drinkbar.notify(message : string, title : string) : void

### drinkbar.log(message : string) : void

