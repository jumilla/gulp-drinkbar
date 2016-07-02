
const drinkbar = require('./drinkbar')
const config = drinkbar.config
const $ = drinkbar.plugins
const path = require('path')

/**
 * parameters
 *     .sources : array
 *     .outputDirectory : string
 *     .outputFileTitle : string
 */
module.exports = (name, parameters = {}) => {
	let sourcePathes = parameters.sources
	let outputDirectory = parameters.outputDirectory || config.outputDirectory
	let outputFileTitle = parameters.outputFileTitle || path.basename(parameters.sources[0])

	return drinkbar.task(name, () => {
		return
			browserify({
				entries: sourcePathes
			})
			.transform('babelify', {presets: 'es2015'})
			.bundle()
			.pipe($.source(outputFileTitle))
			.pipe($.buffer())
			.pipe($.if(config.sourcemaps, $.sourcemaps.init({ loadMaps: true })))
			.pipe($.if(config.production, $.uglify(config.js.uglify.options)))
			.pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
			.pipe($.gulp.dest(outputDirectory))
	})
}
