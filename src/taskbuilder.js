
import Location from './location'

export default class TaskBuilder {

	constructor(task, dependentTasks) {
		this.task = task
		this.dependentTasks = dependentTasks
		this.location = Location.root
		this.handlers = {
			before: [],
			after: [],
		}
	}

	directory(directoryPath) {
		this.location = new Location(directoryPath)
		return this
	}

	resolvePath(path) {
		return this.location.relativePath(path)
	}

	resolvePaths(paths) {
		return paths.map(path => this.location.relativePath(path))
	}

	watch(patterns) {
		if (typeof patterns == 'string') {
			patterns = [patterns]
		}

		drinkbar.watches[this.task] = this.resolvePaths(patterns)

		return this
	}

	on(event, closure) {
		this.handlers[event].push(closure)
		return this
	}

	trigger(event, ...args) {
		this.handlers[event].forEach(closure => {
			closure(args)
		})
		return this
	}

}
