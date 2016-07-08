
import util from '../util'

/**
 * parameters
 *     .inputs : array
 *     .input  : string
 *     .output : string
 *     .cleans : array
 *     .clean  : string
 */
module.exports = function($, builder, parameters = {}) {
	let config = $.config
	let inputPaths = parameters.inputs || (parameters.input ? [parameters.input] : [])
	let outputDirectory = $.path.dirname(parameters.output)
	let outputFileTitle = $.path.basename(parameters.output)
	let cleanPaths = parameters.cleans || (parameters.clean ? [parameters.clean] : [])
	let taskConfig = Object.assign(config.stylus, parameters.config || {})

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isPluginInstalled('stylus', 'gulp-stylus')) return
		if (!util.isValidGlobs(inputPaths)) return

		return $.gulp.src(inputPaths)
			.pipe($.stylus(taskConfig)
				.on('error', err => {
					$.notify.onError({
						title: 'Gulp compile failed',
						message: '<%= error.message %>',
						onLast: true,
					})(err)

					this.emit('end')
				})
			)
			.pipe($.notify({
				title: 'Gulp compile success!',
				message: '<%= file.relative %>',
			}))
//			.pipe($.rename(outputFileTitle))
			.pipe($.if(config.sourcemaps, $.sourcemaps.init({ loadMaps: true })))
			.pipe($.if(config.production, $['clean-css'](config.css.minifier)))
			.pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
			.pipe($.gulp.dest(outputDirectory))
			.on('end', () => {
				$.del.sync(cleanPaths)
			})

		return result
	})
}
