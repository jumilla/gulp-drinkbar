
import {assert, expect, should} from 'chai'
import gulp from 'gulp'
import rollup from 'gulp-drinkbar-rollup'
import concat from 'gulp-concat'

describe('gulp-drinkbar streams/rollup', () => {
	it('require', done => {
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'es'}))
			.pipe(concat('rollup-1-es.js'))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
//				done()
			})
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'amd'}))
			.pipe(concat('rollup-1-amd.js'))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
//				done()
			})
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'umd', moduleName: 'main'}))
			.pipe(concat('rollup-1-umd.js'))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
//				done()
			})
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'cjs'}))
			.pipe(concat('rollup-1-cjs.js'))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
//				done()
			})
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'iife', moduleName: 'main'}))
			.pipe(concat('rollup-1-iife.js'))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})

	it('combine', done => {
		gulp.src(['test/sandbox/inputs/s1.js', 'test/sandbox/inputs/s2.js'])
			.pipe(rollup())
			.pipe(concat('rollup-2.js'))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})
})
