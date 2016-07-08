
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

	coffeescript: {
		bare: true,
	},

	typescript: {
	},

	browserify: {
	},
}

