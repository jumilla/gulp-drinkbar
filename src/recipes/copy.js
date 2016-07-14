
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
 */
export default function($, builder, parameters) {
	util.checkParameterIsObject(parameters)

	let inputPaths = builder.resolvePaths(parameters.inputs || (parameters.input ? [parameters.input] : []))
	let outputDirectory = builder.resolvePath(parameters.output || '.')
	let cleanPaths = builder.resolvePaths(parameters.cleans || (parameters.clean ? [parameters.clean] : []))

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
				$.del.sync(cleanPaths)

				builder.trigger('after')
			})
	})
}
