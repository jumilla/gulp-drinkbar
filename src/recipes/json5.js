
import util from '../util'

/**
 * $ : object(plugins)
 * builder : object(TaskBuilder)
 * parameters : object
 *     .input  : string
 *     .inputs : array
 *     .output : string
 *     .clean  : string
 *     .cleans : array
 *     .config : object
 */
module.exports = function($, builder, parameters = {}) {
	let config = $.config
	let inputPaths = parameters.inputs || (parameters.input ? [parameters.input] : [])
	let outputDirectory = parameters.output
	let cleanPaths = parameters.cleans || (parameters.clean ? [parameters.clean] : [])
	let taskConfig = util.extend(config.json5, parameters.config || {})

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isPluginInstalled('json5', 'json5')) return
		if (!util.isValidGlobs(inputPaths)) return

		builder.trigger('before')

		return $.gulp.src(inputPaths)
			.pipe($.json5(taskConfig)
				.on('error', function (err) {
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
			.on('end', function () {
				$.del.sync(cleanPaths)

				builder.trigger('after')
			})

		return result
	})
}
