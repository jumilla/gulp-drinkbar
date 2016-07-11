
import util from '../util'
import objectAssign from 'object-assign'

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
	let taskConfig = objectAssign({}, config.browserify, parameters.config || {})

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isPluginInstalled('browserify', 'browserify')) return
		if (!util.isPluginInstalled('babelify', 'babelify')) return
		if (!util.isValidGlobs(inputPaths)) return

		builder.trigger('before')

		return $.browserify(inputPaths, taskConfig)
			.transform($.babelify, taskConfig.babelify)
			.bundle()
			.on('error', function (err) {
				$.notify.onError({
					title: 'Gulp compile failed',
					message: '<%= error.message %>',
					onLast: true,
				})(err)

				this.emit('end')
			})
			.pipe($.source(outputFileTitle))
			.pipe($.buffer())
			.pipe($.notify({
				title: 'Gulp compile success!',
				message: '<%= file.relative %>',
			}))
			.pipe($.if(config.sourcemaps, $.sourcemaps.init({ loadMaps: true })))
			.pipe($.if(config.production, $.uglify(config.js.uglify)))
			.pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
			.pipe($.gulp.dest(outputDirectory))
			.on('end', function () {
				$.del.sync(cleanPaths)

				builder.trigger('after')
			})

		return result
	})
}
