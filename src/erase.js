
import drinkbar from './drinkbar'
import del from 'del'
import path from 'path'

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
		return del(filePatterns)
	})
}
