
import util from '../util'

/**
 * parameters
 *     .inputs : array
 *     .input  : string
 *     .config : object
 */
module.exports = function($, builder, parameters) {
	let inputPaths = parameters.inputs || (parameters.input ? [parameters.input] : [])
	let taskConfig = util.extend($.config.browserSync, parameters.config || {})

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isPluginInstalled('browserSync', 'browser-sync')) return
		if (!util.isValidGlobs(inputPaths)) return

		builder.trigger('before')

		let browserSync = $.browserSync.create()

		browserSync.init(taskConfig)

		inputPaths.forEach(
			inputPath => $.gulp.watch(inputPath).on('change', browserSync.reload)
		)
	})
}
