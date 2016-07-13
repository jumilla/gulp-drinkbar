
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
	let outputDirectory = parameters.output
	let cleanPaths = parameters.cleans || (parameters.clean ? [parameters.clean] : [])
	let taskConfig = util.extend(config.yaml, parameters.config || {})

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isPluginInstalled('yaml', 'js-yaml')) return
		if (!util.isValidGlobs(inputPaths)) return

		builder.trigger('before')

		return $.gulp.src(inputPaths)
			.pipe($.yaml(taskConfig)
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
