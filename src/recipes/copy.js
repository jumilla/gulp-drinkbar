
import util from '../util'

/**
 * parameters
 *     .inputs : array
 *     .input  : string
 *     .output : string
 */
module.exports = function($, builder, parameters) {
	let inputPaths = parameters.inputs || (parameters.input ? [parameters.input] : [])
	let outputDirectory = parameters.output

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isValidGlobs(inputPaths)) return

		builder.trigger('before')

		return $.gulp.src(inputPaths)
			.pipe($.gulp.dest(outputDirectory))
			.pipe($.notify({
				title: 'File copy success!',
				message: '<%= file.relative %>',
			}))
			.on('end', () => {
				builder.trigger('after')
			})
	})
}
