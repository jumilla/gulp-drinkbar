
import plugins from './plugins'
import config from './config'
import TaskBuilder from './taskbuilder'
import Location from './location'
import notifier from 'node-notifier'



plugins.config = config



const drinkbar = {
	config: config,

	plugins: plugins,

	location(directoryPath) {
		return new Location(directoryPath)
	},

	tasks: {},

	watches: {},
}



drinkbar.task = (task, dependentTasks = []) => {
	let builder =  new TaskBuilder(task, dependentTasks)

	drinkbar.tasks[task] = builder

	return builder
}

drinkbar.addBuilderMethod = (method, closure) => {
	TaskBuilder.prototype[method] = function (...args) {
		closure.apply(TaskBuilder, [drinkbar.plugins, this].concat(args))
		return this
	}
}

drinkbar.addBuilderMethod('define', ($, builder, closure = null) => {
	if (!closure) {
		closure = () => {
			builder.trigger('before')
			builder.trigger('after')
		}
	}

	$.gulp.task(builder.task, builder.dependentTasks, closure)
})



function addRecipe(method, recipe = null) {
	if (!recipe) recipe = method
	drinkbar.addBuilderMethod(method, require('./recipes/' + recipe))
}

addRecipe('copy')
addRecipe('jade', 'pug')
addRecipe('pug')
addRecipe('stylus')
addRecipe('sass')
addRecipe('less')
addRecipe('babel')
addRecipe('coffeescript')
addRecipe('typescript')
addRecipe('riot')
addRecipe('json5')
addRecipe('cson')
addRecipe('yaml')
addRecipe('styles')
addRecipe('scripts')
addRecipe('browserify')
addRecipe('webpack')
//addRecipe('rollup')
addRecipe('clean')
addRecipe('browsersync')



drinkbar.log = message => plugins.util.log(message)

drinkbar.notify = (message, title = 'Gulp compile success!') => {
	notifier.notify({
		title: title,
		message: message,
	})
}



module.exports = drinkbar
