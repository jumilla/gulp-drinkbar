
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

drinkbar.addBuilder('define', ($, builder) => {
	$.gulp.task(builder.task, builder.dependentTasks, () => {})
})
drinkbar.addBuilder('pug', require('./recipes/pug'))
drinkbar.addBuilder('styles', require('./recipes/styles'))
drinkbar.addBuilder('stylus', require('./recipes/stylus'))
drinkbar.addBuilder('sass', require('./recipes/sass'))
drinkbar.addBuilder('less', require('./recipes/less'))
drinkbar.addBuilder('scripts', require('./recipes/scripts'))
drinkbar.addBuilder('coffeescript', require('./recipes/coffeescript'))
drinkbar.addBuilder('typescript', require('./recipes/typescript'))
drinkbar.addBuilder('browserify', require('./recipes/browserify'))
drinkbar.addBuilder('erase', require('./recipes/erase'))

drinkbar.addBuilder('watch', function ($, builder, patterns) {
	drinkbar.watches[builder.task] = patterns
})



module.exports = drinkbar
