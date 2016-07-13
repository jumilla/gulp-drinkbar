
import util from '../util'

/**
 * $ : object(plugins)
 * builder : object(TaskBuilder)
 * parameters : object
 *     .config : object
 *     .watch  : string
 *     .watches : array
 */
module.exports = function($, builder, parameters) {
	let taskConfig = util.extend($.config.browserSync, parameters.config || {})
	let watchPaths = parameters.watches || (parameters.watch ? [parameters.watch] : [])

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isPluginInstalled('browserSync', 'browser-sync')) return

		builder.trigger('before')

		let browserSync = $.browserSync.create()

		browserSync.init(taskConfig)

		watchPaths.forEach(
			watchPath => $.gulp.watch(watchPath).on('change', browserSync.reload)
		)
	})
}
