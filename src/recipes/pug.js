
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
	let taskConfig = Object.assign(config.pug, parameters.config || {})

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isPluginInstalled('pug', 'gulp-pug')) return
		if (!util.isValidGlobs(inputPaths)) return

		return $.gulp.src(inputPaths)
			.pipe($.pug(taskConfig)
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
			.pipe($.gulp.dest(outputDirectory))
			.on('end', () => {
				$.del.sync(cleanPaths)
			})

		return result
	})
}
