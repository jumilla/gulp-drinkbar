
import plugins from './plugins'
import config from './config'
import Location from './location'
import notifier from 'node-notifier'



plugins.config = config



const drinkbar = {
	config: config,

	plugins: plugins,

	location(dir) {
		return new Location(dir)
	},

	tasks: {},

	watches: {},
}



drinkbar.TaskBuilder = function (task, dependentTasks) {
	this.task = task
	this.dependentTasks = dependentTasks
	this.handlers = {
		before: [],
		after: [],
	}
}

drinkbar.task = (task, dependentTasks = []) => {
	let builder =  new drinkbar.TaskBuilder(task, dependentTasks)

	drinkbar.tasks[task] = builder

	return builder
}

drinkbar.TaskBuilder.prototype.on = function (event, closure) {
	this.handlers[event].push(closure)
	return this
}

drinkbar.TaskBuilder.prototype.trigger = function (event, ...args) {
	this.handlers[event].forEach(closure => {
		closure(args)
	})
	return this
}

drinkbar.log = message => {
	plugins.util.log(message)
}

drinkbar.notify = (message, title = 'Gulp compile success!') => {
	notifier.notify({
		title: title,
		message: message,
	})
}

drinkbar.addBuilderMethod = (method, closure) => {
	drinkbar.TaskBuilder.prototype[method] = function (...args) {
		closure.apply(drinkbar.TaskBuilder, [drinkbar.plugins, this].concat(args))
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

drinkbar.addBuilderMethod('watch', function ($, builder, patterns) {
	if (typeof patterns == 'string') {
		patterns = [patterns]
	}
	drinkbar.watches[builder.task] = patterns
})



drinkbar.addRecipe = (method, recipe = null) => {
	if (!recipe) recipe = method
	drinkbar.addBuilderMethod(method, require('./recipes/' + recipe))
}

drinkbar.addRecipe('copy')
drinkbar.addRecipe('jade', 'pug')
drinkbar.addRecipe('pug')
drinkbar.addRecipe('stylus')
drinkbar.addRecipe('sass')
drinkbar.addRecipe('less')
drinkbar.addRecipe('babel')
drinkbar.addRecipe('coffeescript')
drinkbar.addRecipe('typescript')
drinkbar.addRecipe('riot')
drinkbar.addRecipe('json5')
drinkbar.addRecipe('cson')
drinkbar.addRecipe('yaml')
drinkbar.addRecipe('styles')
drinkbar.addRecipe('scripts')
drinkbar.addRecipe('browserify')
drinkbar.addRecipe('webpack')
drinkbar.addRecipe('clean')
drinkbar.addRecipe('browsersync')



module.exports = drinkbar
