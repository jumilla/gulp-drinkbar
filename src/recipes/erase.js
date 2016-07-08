
import util from '../util'

/**
 * parameters
 *     .inputs : array
 *     .output : string
 */
module.exports = function($, builder, filePatterns) {
	let config = $.config

	if (typeof filePatterns === 'string') {
		filePatterns = [filePatterns]
	}

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isValidGlobs(filePatterns)) return

		builder.trigger('before')

		let result = $.del.sync(filePatterns)

		builder.trigger('after')

		return result
	})
}
