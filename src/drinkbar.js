
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
	let builder =  new TaskBuilder(drinkbar, task, dependentTasks)

	drinkbar.tasks[task] = builder

	return builder
}

drinkbar.addBuilderMethod = (method, closure) => {
	TaskBuilder.prototype[method] = function (...args) {
		closure.apply(TaskBuilder, [plugins, this].concat(args))
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

drinkbar.log = message => plugins.util.log(message)

drinkbar.notify = (message, title = 'Gulp compile success!') => {
	notifier.notify({
		title: title,
		message: message,
	})
}



export default drinkbar
