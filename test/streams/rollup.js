
import {assert, expect, should} from 'chai'
import gulp from 'gulp'
import rollup from 'gulp-drinkbar-rollup-stream'

describe('gulp-drinkbar streams/rollup', () => {
	it('format=es', done => {
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'es', dest: 'rollup-1-es.js'}))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})

	it('format=amd', done => {
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'amd', dest: 'rollup-1-amd.js'}))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})

	it('format=umd', done => {
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'umd', moduleName: 'main', dest: 'rollup-1-umd.js'}))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})

	it('format=cjs', done => {
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'cjs', dest: 'rollup-1-cjs.js'}))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})

	it('format=iife', done => {
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({format: 'iife', moduleName: 'main', dest: 'rollup-1-iife.js'}))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})

	it('require', done => {
		gulp.src('test/sandbox/inputs/s1.js')
			.pipe(rollup({dest: 'rollup-2.js'}))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})

	it('combine', done => {
		gulp.src(['test/sandbox/inputs/s1.js', 'test/sandbox/inputs/s2.js'])
			.pipe(rollup({dest: 'rollup-3.js'}))
			.pipe(gulp.dest('test/sandbox/outputs'))
			.on('end', () => {
				done()
			})
	})
})
