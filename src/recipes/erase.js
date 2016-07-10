
import util from '../util'

/**
 */
module.exports = function($, builder, filePatterns) {
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
