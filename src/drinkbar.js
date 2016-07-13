
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
	drinkbar.watches[builder.task] = patterns
})

drinkbar.addRecipe = (method, path) => {
	drinkbar.addBuilderMethod(method, require(path))
}

drinkbar.addRecipe('copy', './recipes/copy')
drinkbar.addRecipe('jade', './recipes/pug')
drinkbar.addRecipe('pug', './recipes/pug')
drinkbar.addRecipe('stylus', './recipes/stylus')
drinkbar.addRecipe('sass', './recipes/sass')
drinkbar.addRecipe('less', './recipes/less')
drinkbar.addRecipe('babel', './recipes/babel')
drinkbar.addRecipe('coffeescript', './recipes/coffeescript')
drinkbar.addRecipe('typescript', './recipes/typescript')
drinkbar.addRecipe('riot', './recipes/riot')
drinkbar.addRecipe('json5', './recipes/json5')
drinkbar.addRecipe('cson', './recipes/cson')
drinkbar.addRecipe('yaml', './recipes/yaml')
drinkbar.addRecipe('styles', './recipes/styles')
drinkbar.addRecipe('scripts', './recipes/scripts')
drinkbar.addRecipe('browserify', './recipes/browserify')
drinkbar.addRecipe('webpack', './recipes/webpack')
drinkbar.addRecipe('clean', './recipes/clean')
drinkbar.addRecipe('browsersync', './recipes/browsersync')



module.exports = drinkbar
