
import gulp from 'gulp'
import drinkbar from './drinkbar'



function addRecipe(method, recipe = null) {
	if (!recipe) recipe = method
	drinkbar.addBuilderMethod(method, require('./recipes/' + recipe))
}

addRecipe('copy')
addRecipe('jade', 'pug')
addRecipe('pug')
addRecipe('stylus')
addRecipe('sass')
addRecipe('less')
addRecipe('babel')
addRecipe('coffeescript')
addRecipe('typescript')
addRecipe('riot')
addRecipe('json5')
addRecipe('cson')
addRecipe('yaml')
addRecipe('styles')
addRecipe('scripts')
addRecipe('browserify')
addRecipe('webpack')
//addRecipe('rollup')
addRecipe('clean')
addRecipe('browsersync')



gulp.task('watch', () => {
	for (let task in drinkbar.watches) {
		gulp.watch(drinkbar.watches[task], [task])
	}
})



module.exports = drinkbar
