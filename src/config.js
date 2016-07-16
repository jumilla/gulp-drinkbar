
import env from './env'

export default {
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
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015'],
					},
				},
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015', 'react'],
					},
				},
			],
		}
	},

	rollup: {
	},

	browserSync: {
	},
}

