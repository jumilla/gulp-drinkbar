
import env from './env'

module.exports = {
	sourceDirectory: 'assets',
	outputDirectory: 'public',

	sourcemaps: !env.inProduction,
	production: env.inProduction,

	css: {
		minifier: {
		},
	},

	js: {
		uglify: {
		},
	},

	pug: {
	},

	stylus: {
	},

	sass: {
	},

	less: {
	},

	babel: {
	},

	coffeescript: {
		bare: true,
	},

	typescript: {
	},

	riot: {
	},

	json5: {
	},

	cson: {
	},

	yaml: {
	},

	browserify: {
		babelify: {presets: 'es2015'},
	},

	webpack: {
	},

	browserSync: {
	},
}

