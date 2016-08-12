# gulp-drinkbar

## 概要

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
	})
```

## はじめよう

gulp-drinkbarの動作環境は次の通りです。

| Module        | Version       |
| ------------- | ------------- |
| Node.js       | >= 0.12       |
| gulp          | >= 3.9        |

### インストール

[1] Install `gulp` on global and local.

```shell
npm install -g gulp
npm install gulp --save-dev
```

[2] Install `gulp-drinkbar`.

```shell
npm install gulp-drinkbar --save-dev
```

### 最小のサンプル

[1] `gulpfile.js` ファイルを作成する.

```javascript
var drinkbar = require('gulp-drinkbar')

drinkbar
	.task('default')
	.define()
```

[2] コンソールで `gulp` コマンドを実行する.

これでOK！

サンプルをもっと見たければ、[gulp-drinkbar-examples](http://github.com/jumilla/gulp-drinkbar-examples)をダウンロードしてください。

## コマンド

あなたが使い慣れている `gulp` コマンドをそのまま使用できます。

### gulp

`default`タスクを実行します。

.css と .js を生成するタスクでは、sourcemapも生成します。

### gulp --production

`default`タスクを実行します。

.cssを生成するタスクでは、minifyを実行します。

.jsを生成するタスクでは、uglifyを実行します。

### gulp --tasks

定義されているGulpタスクの一覧を表示します。

### gulp `<task>`

`<task>`で指定したgulpタスクを実行します。

### gulp watch

タスクに指定されたファイルパターンを監視し、変更を検知した時点でタスクを実行します。



## タスク定義

Gulpタスクは `gulpfile.js` に記述します。

##### gulpfile.js

```javascript
var drinkbar = require('gulp-drinkbar')

drinkbar
	.task({taskname})
	.{recipe}({})
```

`{task}` には任意のGulpタスク名を指定します。

`{recipe}` には、後述するレシピ関数を指定します。
レシピ関数にはオブジェクト形式でパラメーターを指定できます。

ES2015で記述したい場合は、`.babelrc` ファイルを用意し、`gulpfile.js` の代わりに `gulpfile.babel.js` というファイル名を使います。

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


### 入力ファイルの指定方法

レシピ関数のパラメーターに入力ファイルパスを指定する方法は2つあります。

単一ファイルパスもしくはファイルパターンを指定するには、inputに指定します。

```javascript
{
	input: 'assets/test-1/a.css',
}
```

複数ファイルパスもしくはファイルパターンを指定するには、inputsに指定します。

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

### タスクグループ

タスクをグループ化するには、drinkbar.task() の第2引数に依存タスクを指定し、何もしないタスクを定義してください。

```javascript
drinkbar
	.task('scripts', ['script:libs', 'script:app'])
	.define()
```  		  

コマンド `gulp scripts` を実行すると、`script:libs`タスクと`script:app`タスクが実行されます。



## レシピ

指定したgulpタスクで行わせるよくある処理を関数化したものを、レシピと呼んでいます。

レシピには、指定したソースファイルリストの一つ一つに対して処理を行わせる「変換レシピ」と、指定したソースファイルリストから一つのファイルを生成する「結合レシピ」、その他ファイルを生成しない「作業レシピ」があります。

### copy

To copy file simply.

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

- Recipe Type: 変換レシピ
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)

### pug (jade)

pug(jade)ファイルをコンパイルするレシピです。
.htmlファイルを生成します。

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
- Modules:
  - [Require] [gulp-pug](https://www.npmjs.com/package/gulp-pug)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: Pugの設定: (デフォルト: `{}`)
      - See: https://github.com/jamen/gulp-pug#api
    }

### stylus

Stylusファイルをコンパイルするレシピです。
.cssファイルを生成します。

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
- Modules:
  - [Require] [gulp-stylus](https://www.npmjs.com/package/gulp-stylus)
  - [Optional] [nib](https://www.npmjs.com/package/nib) if use `@import 'nib'`
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: Stylusの設定: (デフォルト: `{}`)
      - See: https://github.com/jescalan/accord/blob/master/docs/stylus.md
    - [Optional] config.autoprefixer: Autoprefixerの設定
      - See: https://github.com/postcss/autoprefixer#options

### sass

Sassファイルをコンパイルするレシピです。
.cssファイルを生成します。

`Compass` には対応していません。

```javascript
drinkbar
	.task('style:app')
	.sass({
		inputs: [
			'resources/assets/sass/app.scss',
			'resources/assets/sass/lib.sass',
		],
		output: 'public/assets',
		config: {
			autoprefixer: 'last 10 versions',
		},
	})
	.watch('resources/assets/sass/**/*.+(scss|sass)')
```

- Recipe Type: 変換レシピ
- Modules:
  - [Require] [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: Sassの設定: (デフォルト: `{}`)
      - See: https://github.com/sass/node-sass#options
    - [Optional] config.autoprefixer: Autoprefixerの設定
      - See: https://github.com/postcss/autoprefixer#options

### less

lessファイルをコンパイルするレシピです。
.cssファイルを生成します。

```javascript
drinkbar
	.task('style:app')
	.less({
		inputs: [
			'resources/assets/less/app.less',
		],
		output: 'public/assets',
		config: {
		},
	})
	.watch('resources/assets/less/**/*.less')
```

- Recipe Type: 変換レシピ
- Modules:
  - [Require] [gulp-less](https://www.npmjs.com/package/gulp-less)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: Lessの設定: (デフォルト: `{}`)
      - See: https://github.com/plus3network/gulp-less#options
    - [Optional] config.autoprefixer: Autoprefixerの設定
      - See: https://github.com/postcss/autoprefixer#options

### babel

babelを使ってJavaScriptをコンパイルするレシピです。
プリセットを指定することで、ES2015やJSXをコンパイルできます。
.jsファイルを生成します。

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

- Recipe Type: 変換レシピ
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: Babelの設定: (デフォルト: `{}`)
      - See: https://babeljs.io/docs/usage/options/

### coffeescript

CoffeeScriptファイルをコンパイルするレシピです。
.jsファイルを生成します。

```javascript
.coffeescript({
		inputs: [
			'assets/test-7/a.coffee',
			'assets/test-7/b.coffee',
		],
		output: 'results/test-7',
	})
```

- Recipe Type: 変換レシピ
- Modules:
  - [Require] [gulp-coffee](https://www.npmjs.com/package/gulp-coffee)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: CoffeeScriptの設定: (デフォルト: `{}`)
      - see: http://coffeescript.org/

### typescript

TypeScriptファイルをコンパイルするレシピです。
.jsファイルを生成します。

```javascript
.typescript({
		inputs: [
			'assets/test-8/a.ts',
			'assets/test-8/b.ts',
		],
		output: 'results/test-8',
	})
```

- Recipe Type: 変換レシピ
- Modules:
  - [Require] [gulp-typescript](https://www.npmjs.com/package/gulp-typescript)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: TypeScriptの設定: (デフォルト: `{}`)
      - See: https://github.com/ivogabe/gulp-typescript#options

### json5

JSON5ファイルをコンパイルするレシピです。
.jsonファイルを生成します。

```javascript
.json5({
		input: 'assets/test-14/config.json5',
		output: 'results/test-14',
	})
```

- Recipe Type: 変換レシピ
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: JSON5の設定: (デフォルト: `{}`)

### cson

CSONファイルをコンパイルするレシピです。
.jsonファイルを生成します。

```javascript
.cson({
		input: 'assets/test-15/config.cson',
		output: 'results/test-15',
	})
```

- Recipe Type: 変換レシピ
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: CSONの設定: (デフォルト: `{}`)

### yaml

YAMLファイルをコンパイルするレシピです。
.jsonファイルを生成します。

```javascript
.yaml({
		input: 'assets/test-16/config.yaml',
		output: 'results/test-16',
	})
```

- Recipe Type: 変換レシピ
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Optional] output: 出力先ディレクトリパス (デフォルト: `'.'`)
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: YAMLの設定: (デフォルト: `{}`)

### styles

複数のスタイルシートを連結し、単一の.cssファイルを生成します。

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

- Recipe Type: 結合レシピ
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Require] output: 出力先ファイルパス
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)

### scripts

複数のスクリプトを連結し、単一の.jsファイルを生成します。

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

- Recipe Type: 結合レシピ
- Modules: Nothing
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Require] output: 出力先ファイルパス
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)

### browserify

`browserify`を使って複数のスクリプトを連結し、Webブラウザで実行できる単一の.jsファイルを生成します。
`babelify`で、ES2015やJSX形式のスクリプトをコンパイルすることもできます。

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

- Recipe Type: 結合レシピ
- Modules:
  - [Require] [gulp-drinkbar-browserify](https://www.npmjs.com/package/gulp-drinkbar-browserify)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Require] output: 出力先ファイルパス
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: Browserifyの設定: (デフォルト: `{}`)
      - See: https://github.com/substack/node-browserify#browserifyfiles--opts

### webpack

`webpack`を使って複数のスクリプトを連結し、Webブラウザで実行できる単一の.jsファイルを生成します。
`babel-loader`で、ES2015やJSX形式のスクリプトをコンパイルすることもできます。

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

- Recipe Type: 結合レシピ
- Modules:
  - [Require] [gulp-drinkbar-webpack](https://www.npmjs.com/package/gulp-drinkbar-webpack)
- Arguments:
  - [Require] 1. object
    - [Require] input/inputs: 入力ファイルパス
    - [Require] output: 出力先ファイルパス
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: Webpackの設定: (デフォルト: `{}`)
      - See: https://webpack.github.io/docs/configuration.html

### rollup

`rollup`を使ってES2015形式のスクリプトをビルドし、さまざまな形式の.jsファイルを生成します。
プラグインは`rollup-plugin-node-resolve`と`rollup-plugin-commonjs`が有効になっています。
Babelを使いたい場合は、config.plugins を指定してください。

```javascript
drinkbar
	.task('scripts:app')
	.rollup({
		input: 'resources/assets/js/app.js',
		output: 'public/assets/app.js',
		config: {},
	})
	.watch('resources/assets/js/**/*.js')
```

- Recipe Type: 結合レシピ
- Modules:
  - [Require] [gulp-drinkbar-rollup](https://www.npmjs.com/package/gulp-drinkbar-rollup)
- Arguments:
  - [Require] 1. object
    - [Require] input: 入力ファイルパス
    - [Require] output: 出力先ファイルパス
    - [Optional] clean/cleans: 削除ファイルパス (デフォルト: `[]`)
    - [Optional] config: Rollupの設定: (デフォルト: `{format: 'umd', moduleName: 'main'}`)
	  - See: https://github.com/rollup/rollup/wiki/JavaScript-API#rolluprollup-options-

### clean

指定のフォルダ、ファイルを削除します。

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

- Recipe Type: 作業レシピ
- Modules: Nothing
- Arguments:
	- [Require] 1. string / array[string]: 入力ファイルパス

### browsersync

`browser-sync`を使って、ライブリロードが可能なWebサーバーを立てることができます。

watchにファイルパターンを指定すると、対象ファイルが更新されるたびに閲覧している  
ページがリロードされるようになります。

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

- Recipe Type: 作業レシピ
- Modules:
  - [Require] [browser-sync](https://www.npmjs.com/package/browser-sync)
- Arguments:
  - [Require] 1. object
    - [Optional] config: BrowserSyncの設定
      - See: https://browsersync.io/docs/options
    - [Optional] watch/watches: 監視ファイルパス (watch file path(s))



## メソッド

### drinkbar.task(task : string, dependentTasks : array) : TaskBuilder

タスクビルダーを生成します。

##### 引数

- task : string : タスク名
- dependentTasks : array : 依存タスク名リスト

##### 戻り値

- TaskBuilder : タスクビルダー

### TaskBuilder#{recipe}(...parameters) : TaskBuilder

指定のレシピでGulpタスクを作成します。

##### 引数

- parameters : argument array : 引数リスト

##### 戻り値

- TaskBuilder : タスクビルダー

### TaskBuilder#define(closure : function($, builder, ...parameters) = null) : TaskBuilder

指定のロジックでGulpタスクを作成します。

##### 引数

- closure : function($, builder, ...parameters) : 定義関数

##### 戻り値

- TaskBuilder : タスクビルダー

### TaskBuilder#on('before', callback : function) : TaskBuilder

Gulpタスク実行前のイベントを受け取ります。

##### 引数

- callback : function() : コールバック関数

##### 戻り値

- TaskBuilder : タスクビルダー

### TaskBuilder#on('after', callback : function) : TaskBuilder

Gulpタスク実行後のイベントを受け取ります。

##### 引数

- callback : function() : コールバック関数

##### 戻り値

- TaskBuilder : タスクビルダー

### TaskBuilder#watch(patterns : string|array) : TaskBuilder

監視するファイルパターンをGlob形式で指定し、Gulpタスクに関連付けます。

##### 引数

- patterns : string|array : ファイルパターンまたはファイルパターン配列

##### 戻り値

- TaskBuilder : タスクビルダー

### drinkbar.notify(message : string, title : string) : void

プラットフォームに通知を送ります。

同じ内容をコンソールにもログ出力します。

##### 引数

- message : string : 通知するメッセージ
- title : string : メッセージにつけるタイトル

##### 戻り値

ありません。

### drinkbar.log(message : string) : void

コンソールにログ出力します。

`chalk` ライブラリを使って色をつけることもできます。

##### 引数

- message : string : 出力するメッセージ

##### 戻り値

ありません。



## Author

フミリア ([https://github.com/jumilla](古川 文生))
Yuuki ([https://github.com/yuki332](新井 友樹))

[MIT](http://spdx.org/licenses/MIT)ライセンス
