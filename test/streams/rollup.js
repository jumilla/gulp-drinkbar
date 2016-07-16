
import {assert, expect, should} from 'chai'
import gulp from 'gulp'
import rollup from '../../lib/streams/rollup'
import concat from 'gulp-concat'

describe('gulp-drinkbar streams/rollup', () => {
	it('require', done => {
		gulp.src('test/sandbox/inputs/a.js')
			.pipe(rollup({format: 'es'}).on('error', e => {
				conosle.log(e)
				done()
			}))
			.pipe(concat('rollup-1.js'))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})

	it('combine', done => {
		gulp.src(['test/sandbox/inputs/a.js', 'test/sandbox/inputs/b.js'])
			.pipe(rollup())
			.pipe(concat('rollup-2.js'))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})
})
