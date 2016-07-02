
import gulp from 'gulp'
import drinkbar from './drinkbar'



drinkbar.addBuilder('define', ($, builder) => {
	$.gulp.task(builder.task, builder.dependentTasks, () => {})
})
drinkbar.addBuilder('styles', require('./styles'))
drinkbar.addBuilder('sass', require('./sass'))
drinkbar.addBuilder('less', require('./less'))
drinkbar.addBuilder('scripts', require('./scripts'))
drinkbar.addBuilder('browserify', require('./browserify'))
drinkbar.addBuilder('erase', require('./erase'))



gulp.task('watch', () => {
	for (let task in drinkbar.watches) {
		gulp.watch(drinkbar.watches[task], [task])
	}
})



module.exports = drinkbar
