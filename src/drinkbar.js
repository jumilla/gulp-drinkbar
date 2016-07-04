
import plugins from './plugins'
import config from './config'



plugins.config = config



const drinkbar = {
	config: config,

	plugins: plugins,

	watches: {},
}



drinkbar.TaskBuilder = function (task, dependentTasks) {
	this.task = task
	this.dependentTasks = dependentTasks
}

drinkbar.task = (task, dependentTasks = []) => {
	return new drinkbar.TaskBuilder(task, dependentTasks)
}

drinkbar.addBuilder = (method, closure) => {
	drinkbar.TaskBuilder.prototype[method] = function (...args) {
		closure.apply(drinkbar.TaskBuilder, [drinkbar.plugins, this].concat(args))
		return this
	}
}

drinkbar.addBuilder('watch', function ($, builder, patterns) {
	drinkbar.watches[builder.task] = patterns
})



module.exports = drinkbar
