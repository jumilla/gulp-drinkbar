# gulp-drinkbar

## Overview

gulp-drinkbarは、Gulpタスクをシンプルに見やすく記述できます。
gulp-drinkbar helps write gulp tasks more simple and easier to read.

##### gulpfile.js

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
	})
```

## Getting Started

gulp-drinkbarの動作環境は次の通りです。
gulp-drinkbar requires below

| Module        | Version       |
| ------------- | ------------- |
| Node.js       | >= 0.12       |
| gulp          | >= 3.9        |

### Installation

[1] Install `gulp` on global and local.

```shell
npm install -g gulp
npm install gulp --save-dev
```

[2] Install `gulp-drinkbar`.

```shell
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

That's All!

サンプルをもっと見たければ、[gulp-drinkbar-examples](http://github.com/jumilla/gulp-drinkbar-examples)をダウンロードしてください。
To check more examples please download [gulp-drinkbar-examples](http://github.com/jumilla/gulp-drinkbar-examples).

## Commands

あたなが使い慣れている `gulp` コマンドをそのまま使用できます。
gulp commands are used in gulp-drinkbar

### gulp

`default`タスクを実行します。
It runs `default` task

.css と .js を生成するタスクでは、sourcemapも生成します。
Additional sourcemap will be generated if your task includes compiling .css and/or .js file, a

### gulp --production

`default`タスクを実行します。
It runs `default` task

.cssを生成するタスクでは、minifyを実行します。
It runs minify files when the task includes compiling .css file.

.jsを生成するタスクでは、uglifyを実行します。
It runs uglify files when the task includes compiling .js file.

### gulp --tasks

定義されているGulpタスクの一覧を表示します。
To show gulp tasks that you can use in gulp-drinkbar

### gulp `<task>`

`<task>`で指定したgulpタスクを実行します。
It runs specific `<task>`.

### gulp watch

タスクに指定されたファイルパターンを監視し、変更を検知した時点でタスクを実行します。
As you write code and modify your files, this command will listen for changes and automatically run designated tasks.



## Task Definition

Gulpタスクは `gulpfile.js` に記述します。
Your gulp tasks are written in `gulpfile.js`

##### gulpfile.js

```javascript
var drinkbar = require('gulp-drinkbar')

drinkbar
	.task({taskname})
	.{recipe}({})
```

`{task}` には任意のGulpタスク名を指定します。
Your gulp task name is written in `{task}`.

`{recipe}` には、後述するレシピ関数を指定します。
レシピ関数にはオブジェクト形式でパラメーターを指定できます。
You can put your functions (described in the recipe section below) in `{recipe}`

ES2015で記述したい場合は、`.babelrc` ファイルを用意し、`gulpfile.js` の代わりに `gulpfile.babel.js` というファイル名を使います。
If you write task by using ES2015, it needs to be written in `.babelrc` file. And rename the `gulpfile.js` to `gulpfile.bable.js`.

##### .bablerc

```json
{
  "presets": ["es2015"]
}
```

##### gulpfile.babel.js

```javascript
import drinkbar from 'gulp-drinkbar'

drinkbar
	.task({taskname})
	.{recipe}({})
```


### Passing File Path
 入力ファイルの指定方法

レシピ関数のパラメーターに入力ファイルパスを指定する方法は2つあります。
You can pass file paths to parameter in two ways.

単一ファイルパスもしくはファイルパターンを指定するには、.inputを使います。
To pass one file or file pattern to task, use `input:`.

```javascript
{
	input: 'assets/test-1/a.css',
}
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

タスクをグループ化するには、
drinkbar.task() の第2引数に依存タスクを指定し、何もしないタスクを定義してください。
To define task group, create new task with dependency tasks in array.

```javascript
drinkbar
	.task('scripts', ['script:libs', 'script:app'])
	.define()
```  		  

コマンド `gulp scripts` を実行すると、`script:libs`タスクと`script:app`タスクが実行されます。
`script:libs` and `script:app` will run when you hit `gulp scripts`.


## Recipes

指定したgulpタスクで行わせるよくある処理を関数化したものを、レシピと呼んでいます。
Recipes are functions that includes gulp tasks used frequently. 

レシピには、指定したソースファイルリストの一つ一つに対して処理を行わせる「変換レシピ」と、指定したソースファイルリストから一つのファイルを生成する「結合レシピ」、その他ファイルを生成しない「作業レシピ」があります。
Recipes include "compiling recipe" which compile selected file, "concatenating recipe" files which concatenate files into one file, and "work recipe" which doesn't generate any files.

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

- Recipe Type: Compiling recipe
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)

### pug (jade)

pug(jade)ファイルをコンパイルするレシピです。
.htmlファイルを生成します。
To compile pug (jade) file and generate .html file.

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

- Recipe Type: Compiling recipe
- Modules:
  - [Require] [gulp-pug](https://www.npmjs.com/package/gulp-pug)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: Pug configuration.
      - See: https://github.com/jamen/gulp-pug#api

### stylus

Stylusファイルをコンパイルするレシピです。
.cssファイルを生成します。
To compile stylus file and generate .css file.

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

- Recipe Type: Compiling recipe
- Modules:
  - [Require] [gulp-stylus](https://www.npmjs.com/package/gulp-stylus)
  - [Optional] [nib](https://www.npmjs.com/package/nib) if use `@import 'nib'`
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: Stylus configuration.
      - See: https://github.com/jescalan/accord/blob/master/docs/stylus.md
    - [Optional] config.autoprefixer: Autoprefixer configuration.
      - See: https://github.com/postcss/autoprefixer#options

### sass

Sassファイルをコンパイルするレシピです。
.cssファイルを生成します。
To complie Sass file and generate css file.

`Compass` is not available.

```javascript
drinkbar
	.task('style:app')
	.sass({
		inputs: [
			'resources/assets/sass/app.scss',
			'resources/assets/sass/lib.sass',
		],
		output: 'public/assets/app.css',
		config: {
			autoprefixer: 'last 10 versions',
		},
	})
	.watch('resources/assets/sass/**/*.+(scss|sass)')
```

- Recipe Type: Compiling recipe
- Modules:
  - [Require] [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: Sass configuration.
      - See: https://github.com/sass/node-sass#options
    - [Optional] config.autoprefixer: Autoprefixer configuration.
      - See: https://github.com/postcss/autoprefixer#options

### less

lessファイルをコンパイルするレシピです。
.cssファイルを生成します。
To compile less file and generate .css file

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

- Recipe Type: Compiling recipe
- Modules:
  - [Require] [gulp-less](https://www.npmjs.com/package/gulp-less)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: Less configuration.
      - See: https://github.com/plus3network/gulp-less#options
    - [Optional] config.autoprefixer: Autoprefixer configuration.
      - See: https://github.com/postcss/autoprefixer#options

### babel

babelを使ってJavaScriptをコンパイルするレシピです。
プリセットを指定することで、ES2015やJSXをコンパイルできます。
.jsファイルを生成します。

To compile bable file and generate .js file.
It compile selected presets file such as ES2015 or JSX.

```javascript
.babel({
		inputs: [
			'assets/test-6/a.es6',
		],
		output: 'results/test-6',
		config: [
			presets: ['es2015'],
		],
	})
```

```javascript
.babel({
		inputs: [
			'assets/test-6/c.jsx',
		],
		output: 'results/test-6',
		config: [
			presets: ['react'],
		],
	})
```

- Recipe Type: Compiling recipe
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: Babel configuration.
      - See: https://babeljs.io/docs/usage/options/

### coffeescript

CoffeeScriptファイルをコンパイルするレシピです。
.jsファイルを生成します。
To compile coffeescript file and generate .js file.

```javascript
.coffeescript({
		inputs: [
			'assets/test-7/a.coffee',
			'assets/test-7/b.coffee',
		],
		output: 'results/test-7',
	})
```

- Recipe Type: Compiling recipe
- Modules:
  - [Require] [gulp-coffee](https://www.npmjs.com/package/gulp-coffee)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: CoffeeScript configuration.
      - see: http://coffeescript.org/

### typescript

TypeScriptファイルをコンパイルするレシピです。
.jsファイルを生成します。
To compile typescript file and generate .js file.

```javascript
.typescript({
		inputs: [
			'assets/test-8/a.ts',
			'assets/test-8/b.ts',
		],
		output: 'results/test-8',
	})
```

- Recipe Type: Compiling recipe
- Modules:
  - [Require] [gulp-typescript](https://www.npmjs.com/package/gulp-typescript)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: TypeScript configuration.
      - See: https://github.com/ivogabe/gulp-typescript#options

### json5

JSON5ファイルをコンパイルするレシピです。
.jsonファイルを生成します。
To compile json5 file and generate .json file.

```javascript
.json5({
		input: 'assets/test-14/config.json5',
		output: 'results/test-14',
	})
```

- Recipe Type: Compiling recipe
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: JSON5 configuration.

### cson

CSONファイルをコンパイルするレシピです。
.jsonファイルを生成します。
To compile cson file and generate .json file.

```javascript
.cson({
		input: 'assets/test-15/config.cson',
		output: 'results/test-15',
	})
```

- Recipe Type: Compiling recipe
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: CSON configuration.

### yaml

YAMLファイルをコンパイルするレシピです。
.jsonファイルを生成します。
To compile yaml file and generate .json file.

```javascript
.yaml({
		input: 'assets/test-16/config.yaml',
		output: 'results/test-16',
	})
```

- Recipe Type: Compiling recipe
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Optional] output: output directory path. (default is `'.'`)
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: YAML configuration.

### styles

複数のスタイルシートを連結し、単一の.cssファイルを生成します。
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
- Recipe Type: Concatenating recipe
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Require] output: output file path.
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)

### scripts

複数のスクリプトを連結し、単一の.jsファイルを生成します。
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

- Recipe Type: Concatenating recipe
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Require] output: output file path.
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)

### browserify

`browserify`を使って複数のスクリプトを連結し、Webブラウザで実行できる単一の.jsファイルを生成します。
`babelify`で、ES2015やJSX形式のスクリプトをコンパイルすることもできます。
To combine scripts into one by using `browserify`.
scripts that written by using ES2015 and JSX type can be compiled.

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

- Recipe Type: Concatenating recipe
- Modules:
  - [Require] [browserify](https://www.npmjs.com/package/browserify)
  - [Require] [babelify](https://www.npmjs.com/package/babelify)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Require] output: output file path.
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: Browserify configuration.
      - See: https://github.com/substack/node-browserify#browserifyfiles--opts

### webpack

`webpack`を使って複数のスクリプトを連結し、Webブラウザで実行できる単一の.jsファイルを生成します。
`babel-loader`で、ES2015やJSX形式のスクリプトをコンパイルすることもできます。
To combine scripts into one by using `webpack`.
scripts that written by using ES2015 and JSX type can be compiled.

```javascript
drinkbar
	.task('script:app')
	.webpack({
		inputs: [
			'resources/assets/js/app.js',
		],
		output: 'public/assets/app.js',
		config: {
		},
	})
	.watch('resources/assets/js/**/*.js')
```

- Recipe Type: Concatenating recipe
- Modules:
  - [Require] [webpack-stream](https://www.npmjs.com/package/webpack-stream)
  - [Optional] [babel-loader](https://www.npmjs.com/package/babel-loader) if needs compile es2015, react(.jsx), ...
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: input file path(s).
    - [Require] output: output file path.
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: Webpack configuration.
      - See: https://webpack.github.io/docs/configuration.html

### clean

指定のフォルダ、ファイルを削除します。
To erase selected files and/or directories

```javascript
drinkbar
	.task('scripts:clean')
	.clean('resources/assets/app.*')
```

```javascript
drinkbar
	.task('scripts:clean')
	.clean([
		'resources/assets/css/*.css',
		'resources/assets/js/*.js',
	])
```

- Recipe Type: Working recipe
- Modules: Nothing
- Arguments:
	- [Require] 1. string / array[string]: inputs file path(s).

### browsersync

`browser-sync`を使って、ライブリロードが可能なWebサーバーを立てることができます。
You can run local web server that can auto-reload the page by using `browser-sync`.

watchにファイルパターンを指定すると、対象ファイルが更新されるたびに閲覧している  
ページがリロードされるようになります。
Put specific file pattern to `watch` so that the web page will auto-reloads when you save it.

```javascript
drinkbar
	.task('serve')
	.browsersync({
		config: {
			server: 'public',
		},
		watch: 'public/**/*',
	})
```

- Recipe Type: Working recipe
- Modules:
  - [Require] [browser-sync](https://www.npmjs.com/package/browser-sync)
- Arguments:
  - [Require] 1. object
    - [Optional] config: BrowserSync configuration.
      - See: https://browsersync.io/docs/options
    - [Optional] watch/watches: watch file path(s). (default is `[]`)



## Methods

### drinkbar.task(task : string, dependentTasks : array) : TaskBuilder

タスクビルダーを生成します。
create task builder

##### Arguments

- task : string : タスク名
- dependentTasks : array : 依存タスク名リスト

##### Return

- TaskBuilder : タスクビルダー

### TaskBuilder#{recipe}(...parameters) : TaskBuilder

指定のレシピでGulpタスクを作成します。
create gulp task with selected recipes

##### Arguments

- parameters : argument array : 引数リスト

##### Return

- TaskBuilder : タスクビルダー

### TaskBuilder#define(closure : function($, builder, ...parameters) = null) : TaskBuilder

指定のロジックでGulpタスクを作成します。

##### Arguments

- closure : function($, builder, ...parameters) : 定義関数

##### Return

- TaskBuilder : タスクビルダー

### TaskBuilder#on('before', callback : function) : TaskBuilder

Gulpタスク実行前のイベントを受け取ります。
get event that before gulp task runs

##### Arguments

- callback : function() : コールバック関数

##### Return

- TaskBuilder : タスクビルダー

### TaskBuilder#on('after', callback : function) : TaskBuilder

Gulpタスク実行後のイベントを受け取ります。
get event that after gulp task runs

##### Arguments

- callback : function() : コールバック関数

##### Return

- TaskBuilder : タスクビルダー

### TaskBuilder#watch(patterns : string|array) : TaskBuilder

監視するファイルパターンをGlob形式で指定し、Gulpタスクに関連付けます。
select watch file pattern by Glob and link it to gulp task

##### Arguments

- patterns : string|array : ファイルパターンまたはファイルパターン配列

##### Return

- TaskBuilder : タスクビルダー

### drinkbar.notify(message : string, title : string) : void

プラットフォームに通知を送ります。
push notification to platform

同じ内容をコンソールにもログ出力します。
print message to the console

##### Arguments

- message : string : 通知するメッセージ
- title : string : メッセージにつけるタイトル

##### Return

ありません。
none

### drinkbar.log(message : string) : void

コンソールにログ出力します。
print message to the console


`chalk` ライブラリを使って色をつけることもできます。
you can set colors by using `chalk` library

##### Arguments

- message : string : 出力するメッセージ

##### Return

ありません。
none



## Author

Jumilla (Fumio Furukawa)

[MIT](http://spdx.org/licenses/MIT) License.
