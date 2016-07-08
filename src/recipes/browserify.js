
import browserify from 'browserify'
import path from 'path'
import util from '../util'

/**
 * parameters
 *     .inputs : array
 *     .output : string
 */
module.exports = function($, builder, parameters = {}) {
	let config = $.config
	let inputPathes = parameters.inputs || [parameters.input]
	let outputDirectory = path.dirname(parameters.output)
	let outputFileTitle = path.basename(parameters.output)
	let taskConfig = Object.assign(config.browserify, parameters.config || {})

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isValidGlobs(inputPathes)) return

		return browserify(inputPathes, taskConfig)
			.transform('babelify', {presets: 'es2015'})
			.bundle()
			.on('error', function (err) {
				$.notify.onError({
					title: 'Gulp compile failed',
					message: '<%= error.message %>',
					onLast: true,
				})(err)

				this.emit('end')
			})
			.pipe($.source(outputFileTitle))
			.pipe($.buffer())
			.pipe($.notify({
				title: 'Gulp compile success!',
				message: '<%= file.relative %>',
			}))
			.pipe($.if(config.sourcemaps, $.sourcemaps.init({ loadMaps: true })))
			.pipe($.if(config.production, $.uglify(config.js.uglify)))
			.pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
			.pipe($.gulp.dest(outputDirectory))
	})
}
