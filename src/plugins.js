
const requirePlugins = {
	'gulp': 'gulp',

	'autoprefixer': 'gulp-autoprefixer',
	'babel': 'gulp-babel',
//	'batch': 'gulp-batch',
	'clean-css': 'gulp-clean-css',
	'concat': 'gulp-concat',
	'if': 'gulp-if',
	'notify': 'gulp-notify',
	'rename': 'gulp-rename',
//	'rev': 'gulp-rev',
//	'rev-replace': 'gulp-rev-replace',
//	'shell': 'gulp-shell',
	'sourcemaps': 'gulp-sourcemaps',
	'tap': 'gulp-tap',
	'uglify': 'gulp-uglify',
	'util': 'gulp-util',
	'watch': 'gulp-watch',

	'buffer': 'vinyl-buffer',
	'map': 'vinyl-map',
	'paths': 'vinyl-paths',
	'source': 'vinyl-source-stream',

	'path': 'path',
	'del': 'del',
}

const optionalPlugins = {
	'browserify': 'browserify',
	'pug': 'gulp-pug',
	'stylus': 'gulp-stylus',
	'sass': 'gulp-sass',
	'less': 'gulp-less',
	'coffeescript': 'gulp-coffee',
	'typescript': 'gulp-typescript',
	'riot': 'gulp-riot',
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
