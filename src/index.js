
import gulp from 'gulp'
import drinkbar from './drinkbar'



drinkbar.addBuilder('define', ($, builder) => {
	$.gulp.task(builder.task, builder.dependentTasks, () => {})
})
drinkbar.addBuilder('styles', require('./recipes/styles'))
drinkbar.addBuilder('sass', require('./recipes/sass'))
drinkbar.addBuilder('less', require('./recipes/less'))
drinkbar.addBuilder('scripts', require('./recipes/scripts'))
drinkbar.addBuilder('browserify', require('./recipes/browserify'))
drinkbar.addBuilder('erase', require('./recipes/erase'))



gulp.task('watch', () => {
	for (let task in drinkbar.watches) {
		gulp.watch(drinkbar.watches[task], [task])
	}
})



module.exports = drinkbar
