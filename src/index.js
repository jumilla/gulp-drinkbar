
import gulp from 'gulp'
import drinkbar from './drinkbar'



gulp.task('watch', () => {
	for (let task in drinkbar.watches) {
		gulp.watch(drinkbar.watches[task], [task])
	}
})



module.exports = drinkbar
