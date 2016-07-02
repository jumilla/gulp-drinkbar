
const gulpPlugins = {
	'gulp': 'gulp',

	'autoprefixer': 'gulp-autoprefixer',
	'babel': 'gulp-babel',
	'batch': 'gulp-batch',
	'clean-css': 'gulp-clean-css',
	'concat': 'gulp-concat',
	'if': 'gulp-if',
	'less': 'gulp-less',
	'notify': 'gulp-notify',
	'rename': 'gulp-rename',
	'rev': 'gulp-rev',
	'rev-replace': 'gulp-rev-replace',
	'sass': 'gulp-sass',
	'shell': 'gulp-shell',
	'sourcemaps': 'gulp-sourcemaps',
	'uglify': 'gulp-uglify',
	'util': 'gulp-util',
	'watch': 'gulp-watch',

	'buffer': 'vinyl-buffer',
	'map': 'vinyl-map',
	'paths': 'vinyl-paths',
	'source': 'vinyl-source-stream',
}

const plugins = {}

for (let name in gulpPlugins) {
	plugins[name] = require(gulpPlugins[name])
}



const env = {
	inProduction: plugins.util.env.production || process.env.NODE_ENV === 'production',
}

const config = {
	sourceDirectory: 'assets',
	outputDirectory: 'public',

	sourcemaps: !env.inProduction,
	production: env.inProduction,

	css: {
	},

	js: {
		uglify: {
			options: {},
		}
	}
}

plugins.config = config



class TaskBuilder {
	constructor(name) {
		this.name = name
	}

	watch(patters) {
		drinkbar.watches[this.name] = patterns
	}
}



const drinkbar = {
	config: config,

	plugins: plugins,

	watches: {},

	task: (name, callback) => {
		gulp.task(name, callback())

		return new TaskBuilder(name)
	},
}



module.exports = drinkbar
