
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

	browserify: {
		babelify: {presets: 'es2015'},
	},

	webpack: {
	},

	json5: {
	},

	cson: {
	},

	yaml: {
	},
}

