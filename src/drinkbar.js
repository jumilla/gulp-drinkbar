
import plugins from './plugins'
import config from './config'
import TaskBuilder from './taskbuilder'
import Location from './location'
import notifier from 'node-notifier'



const $ = plugins
$.config = config



const drinkbar = {
	config: config,

	plugins: $,

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
		closure.apply(TaskBuilder, [$, this].concat(args))
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

drinkbar.log = message => $.util.log(message)

drinkbar.notify = (message, title = 'Gulp compile success!') => {
	notifier.notify({
		title: title,
		message: message,
	})
}

drinkbar.taskGroups = (separator = ':') => {
	const tree = []

	for (const task in drinkbar.tasks) {
		let sub = tree
		let prefix = ''
		task.split(separator).forEach(part => {
			if (prefix) prefix += separator
			prefix += part

			if (!sub[prefix]) {
				sub[prefix] = {}
			}
			sub = sub[prefix]
		})
	}

	let addTask = (tree) => {
		for (const task in tree) {
			// Do not define if already exists
			if (drinkbar.tasks[task]) continue

			const keys = object => {
				const result = []
				for (const key in object) {
					result.push(key)
				}
				return result
			}

			const dependentTasks = keys(tree[task])

			$.gulp.task(task, dependentTasks, () => {})

			addTask(tree[task])
		}
	}

	addTask(tree)
}



export default drinkbar
