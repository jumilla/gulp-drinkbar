
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

	browserify: {
	},

	webpack: {
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
}

