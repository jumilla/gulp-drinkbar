
import {assert, expect, should} from 'chai'

describe('gulp-drinkbar util', () => {
	it('util.extend()', () => {
		let util = require('../lib/util')

		let base = {
			a: 0,
		}

		assert.deepEqual(util.extend(base, {a: 1}), {a: 1}, 'override property `.a`')
		assert.deepEqual(base, {a: 0}, 'base has no effect')
	})
})
