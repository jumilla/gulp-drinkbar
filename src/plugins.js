
const requirePlugins = {
	gulp: 'gulp',

	autoprefixer: 'gulp-autoprefixer',
	babel: 'gulp-babel',
	cleanCss: 'gulp-clean-css',
	concat: 'gulp-concat',
	if: 'gulp-if',
	notify: 'gulp-notify',
	rename: 'gulp-rename',
	sourcemaps: 'gulp-sourcemaps',
	tap: 'gulp-tap',
	uglify: 'gulp-uglify',
	util: 'gulp-util',
	watch: 'gulp-watch',

	buffer: 'vinyl-buffer',
	map: 'vinyl-map',
	paths: 'vinyl-paths',
	source: 'vinyl-source-stream',

	path: 'path',
	del: 'del',
}

const optionalPlugins = {
	pug: 'gulp-pug',
	stylus: 'gulp-stylus',
	nib: 'nib',
	sass: 'gulp-sass',
	less: 'gulp-less',
	coffeescript: 'gulp-coffee',
	typescript: 'gulp-typescript',
	riot: 'gulp-riot',
	json5: './streams/json5',
	cson: './streams/cson',
	yaml: './streams/yaml',
	browserify: 'browserify',
	babelify: 'babelify',
	webpack: 'webpack-stream',
	rollup: './streams/rollup',
	browserSync: 'browser-sync',
}

const plugins = {}

for (let name in requirePlugins) {
	plugins[name] = require(requirePlugins[name])
}

for (let name in optionalPlugins) {
	try {
		plugins[name] = require(optionalPlugins[name])
	}
	catch (e) {
		plugins[name] = null
	}
}

module.exports = plugins
