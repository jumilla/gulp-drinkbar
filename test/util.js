
import {assert, expect, should} from 'chai'
import * as util from '../lib/util'

describe('gulp-drinkbar util', () => {
	it('util.extend()', () => {
		let base = {
			a: 0,
		}

		assert.deepEqual(util.extend(base, {a: 1}), {a: 1}, 'override property `.a`')
		assert.deepEqual(base, {a: 0}, 'base has no effect')
	})
})
