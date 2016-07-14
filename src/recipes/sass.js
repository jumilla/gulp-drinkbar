
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
 *     .config : object
 */
export default function($, builder, parameters) {
	util.checkParameterIsObject(parameters)

	let inputPaths = builder.resolvePaths(parameters.inputs || (parameters.input ? [parameters.input] : []))
	let outputDirectory = builder.resolvePath(parameters.output || '.')
	let cleanPaths = builder.resolvePaths(parameters.cleans || (parameters.clean ? [parameters.clean] : []))
	let taskConfig = util.extend($.config.sass, parameters.config || {})
	let config = util.extend($.config, taskConfig.autoprefixer ? {autoprefixer: taskConfig.autoprefixer} : {})

	$.gulp.task(builder.task, builder.dependentTasks, () => {
		if (!util.isPluginInstalled('sass', 'gulp-sass')) return
		if (!util.isValidGlobs(inputPaths)) return

		builder.trigger('before')

		return $.gulp.src(inputPaths)
			.pipe($.sass(taskConfig)
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
