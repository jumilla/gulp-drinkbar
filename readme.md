# gulp-drinkbar

[日本語](https://github.com/jumilla/gulp-drinkbar/blob/master/README-ja.md)

## Overview

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

To check more examples please download [gulp-drinkbar-examples](http://github.com/jumilla/gulp-drinkbar-examples).

## Commands

gulp commands are used in gulp-drinkbar.

### gulp

It runs `default` task

Additional sourcemap will be generated if your task includes compiling .css and/or .js file.

### gulp --production

It runs `default` task.

It runs minify files when the task includes compiling .css file.

It runs uglify files when the task includes compiling .js file.

### gulp --tasks

To show gulp tasks that you can.

### gulp `<task>`

It runs specific `<task>`.

### gulp watch

As you write code and modify your files, this command will listen for changes and automatically run designated tasks.



## Task Definition

Your gulp tasks are written in `gulpfile.js`

##### gulpfile.js

```javascript
var drinkbar = require('gulp-drinkbar')

drinkbar
	.task({taskname})
	.{recipe}({})
```

Your gulp task name is written in `{task}`.

You can put your functions (described in the recipe section below) in `{recipe}`.

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

You can pass file paths to parameter in two ways.

To pass one file or file pattern to task, use `input:`.

```javascript
{
	input: 'assets/test-1/a.css',
}
```

To pass multiple files or file patterns, use `inputs:`.

```javascript
{
	inputs: [
		'assets/test-1/b.css',
		'assets/test-1/c.css',
	],
}
```
 
Wildcard (Glob) can be used to specify file pattern.

```javascript
{
	inputs: [
		'assets/test-1/**/*.css'
	],
}
```

### Task Group

To define task group, create new task with dependency tasks in array.

```javascript
drinkbar
	.task('scripts', ['script:libs', 'script:app'])
	.define()
```  		  

`script:libs` and `script:app` will run when you hit `gulp scripts`.


## Recipes

Recipes are functions that includes gulp tasks used frequently. 

Recipes include "compiling recipe" which compile selected file, "concatenating recipe" files which concatenate files into one file, and "work recipe" which doesn't generate any files.

### copy

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
		output: 'public/assets',
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

To compile less file and generate .css file

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

### rollup

Build the ES2015 format of the script using the `rollup`, to generate a .js file in a variety of formats.
The plug-in is enabled by `rollup-plugin-node-resolve` and` rollup-plugin-commonjs`.
If you want to use Babel, please specify the config.plugins.

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
    - [Require] input: input file path.
    - [Require] output: output file path.
    - [Optional] clean/cleans: cleanup file path(s). (default is `[]`)
    - [Optional] config: Rollup configuration: (default: `{format: 'umd', moduleName: 'main'}`)
	  - See: https://github.com/rollup/rollup/wiki/JavaScript-API#rolluprollup-options-

### clean

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

You can run local web server that can auto-reload the page by using `browser-sync`.

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

Create task builder.

##### Arguments

- task : string : Task name.
- dependentTasks : array : Dependent tasks list.

##### Return

- TaskBuilder : Task Builder.

### TaskBuilder#{recipe}(...parameters) : TaskBuilder

Create gulp task with selected recipes.

##### Arguments

- parameters : argument array : Aruguments list.

##### Return

- TaskBuilder : Task builder.

### TaskBuilder#define(closure : function($, builder, ...parameters) = null) : TaskBuilder

Make a Gulp task with the specified logic.

##### Arguments

- closure : function($, builder, ...parameters) : Definition function.

##### Return

- TaskBuilder : Task builder.

### TaskBuilder#on('before', callback : function) : TaskBuilder

Get event that before gulp task runs.

##### Arguments

- callback : function() : Callback function.

##### Return

- TaskBuilder : Task builder.

### TaskBuilder#on('after', callback : function) : TaskBuilder

Get event that after gulp task runs.

##### Arguments

- callback : function() : callback function

##### Return

- TaskBuilder : Task builder.

### TaskBuilder#watch(patterns : string|array) : TaskBuilder

Select watch file pattern by Glob and link it to gulp task.

##### Arguments

- patterns : string|array : File pattern or file pattern array.

##### Return

- TaskBuilder : Task builder.

### drinkbar.notify(message : string, title : string) : void

Push notification to platform.

Print message to the console.

##### Arguments

- message : string : Notification message.
- title : string : Notification title.

##### Return

None.

### drinkbar.log(message : string) : void

Print message to the console.

You can set colors by using `chalk` library.

##### Arguments

- message : string : Output message.

##### Return

None.



## Credits

Jumilla ([https://github.com/jumilla](Fumio Furukawa))
Yuuki ([https://github.com/yuki332](Yuki Arai))

[MIT](http://spdx.org/licenses/MIT) License.
