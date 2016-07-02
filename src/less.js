
import drinkbar from './drinkbar'
import path from 'path'

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
	let options = parameters.options || {}

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		return $.gulp.src(inputPathes)
			.pipe($.less()
				.on('error', function (err) {
					$.notify.onError({
						title: 'Gulp compile failed',
						message: '<%= error.message %>',
						onLast: true,
					})(err)

					this.emit('end')
				})
			)
			.pipe($.source(outputFileTitle))
			.pipe($.buffer())
			.pipe($.notify({
				title: 'Gulp compile success!',
				message: '<%= file.relative %>',
			}))
			.pipe($.if(config.sourcemaps, $.sourcemaps.init({ loadMaps: true })))
			.pipe($.if(config.production, $['clean-css'](config.css.minifier.options)))
			.pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
			.pipe($.gulp.dest(outputDirectory))
	})
}
