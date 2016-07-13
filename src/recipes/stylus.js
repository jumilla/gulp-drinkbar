
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
	let inputPaths = parameters.inputs || (parameters.input ? [parameters.input] : [])
	let outputDirectory = parameters.output
	let cleanPaths = parameters.cleans || (parameters.clean ? [parameters.clean] : [])
	let taskConfig = util.extend($.config.stylus, parameters.config || {})
	let config = util.extend($.config, taskConfig.autoprefixer ? {autoprefixer: taskConfig.autoprefixer} : {})

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isPluginInstalled('stylus', 'gulp-stylus')) return
		if (taskConfig.nib && !util.isPluginInstalled('nib', 'nib')) return
		if (!util.isValidGlobs(inputPaths)) return

		if (taskConfig.nib) {
			taskConfig.use = [$.nib()]
		}

		builder.trigger('before')

		return $.gulp.src(inputPaths)
			.pipe($.stylus(taskConfig)
				.on('error', function (err) {
					$.notify.onError({
						title: 'Gulp compile failed',
						message: '<%= error.message %>',
						onLast: true,
					})(err)

					this.emit('end')
				})
			)
			.pipe($.if(config.autoprefixer, $.autoprefixer(config.autoprefixer)))
			.pipe($.notify({
				title: 'Gulp compile success!',
				message: '<%= file.relative %>',
			}))
			.pipe($.if(config.sourcemaps, $.sourcemaps.init({ loadMaps: true })))
			.pipe($.if(config.production, $.cleanCss(config.css.minifier)))
			.pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
			.pipe($.gulp.dest(outputDirectory))
			.on('end', function () {
				$.del.sync(cleanPaths)

				builder.trigger('after')
			})

		return result
	})
}
