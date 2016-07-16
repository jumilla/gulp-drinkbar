
import {assert, expect, should} from 'chai'

describe('gulp-drinkbar recipes', () => {
	it('copy recipe is valid', () => {
		let recipe = require('../lib/recipes/copy')

		assert(recipe != null, 'copy is null')
	})

	it('pug recipe is valid', () => {
		let recipe = require('../lib/recipes/pug')

		assert(recipe != null, 'pug is null')
	})

	it('stylus recipe is valid', () => {
		let recipe = require('../lib/recipes/stylus')

		assert(recipe != null, 'stylus is null')
	})

	it('sass recipe is valid', () => {
		let recipe = require('../lib/recipes/sass')

		assert(recipe != null, 'sass is null')
	})

	it('less recipe is valid', () => {
		let recipe = require('../lib/recipes/less')

		assert(recipe != null, 'less is null')
	})

	it('babel recipe is valid', () => {
		let recipe = require('../lib/recipes/babel')

		assert(recipe != null, 'babel is null')
	})

	it('coffeescript recipe is valid', () => {
		let recipe = require('../lib/recipes/coffeescript')

		assert(recipe != null, 'coffeescript is null')
	})

	it('typescript recipe is valid', () => {
		let recipe = require('../lib/recipes/typescript')

		assert(recipe != null, 'typescript is null')
	})

	it('json5 recipe is valid', () => {
		let recipe = require('../lib/recipes/json5')

		assert(recipe != null, 'json5 is null')
	})

	it('cson recipe is valid', () => {
		let recipe = require('../lib/recipes/cson')

		assert(recipe != null, 'cson is null')
	})

	it('yaml recipe is valid', () => {
		let recipe = require('../lib/recipes/yaml')

		assert(recipe != null, 'yaml is null')
	})

	it('scripts recipe is valid', () => {
		let recipe = require('../lib/recipes/scripts')

		assert(recipe != null, 'scripts is null')
	})

	it('styles recipe is valid', () => {
		let recipe = require('../lib/recipes/styles')

		assert(recipe != null, 'styles is null')
	})

	it('browserify recipe is valid', () => {
		let recipe = require('../lib/recipes/browserify')

		assert(recipe != null, 'browserify is null')
	})

	it('webpack recipe is valid', () => {
		let recipe = require('../lib/recipes/webpack')

		assert(recipe != null, 'webpack is null')
	})

	it('rollup recipe is valid', () => {
		let recipe = require('../lib/recipes/rollup')

		assert(recipe != null, 'rollup is null')
	})

	it('clean recipe is valid', () => {
		let recipe = require('../lib/recipes/clean')

		assert(recipe != null, 'clean is null')
	})

	it('browsersync recipe is valid', () => {
		let recipe = require('../lib/recipes/browsersync')

		assert(recipe != null, 'browsersync is null')
	})
})
