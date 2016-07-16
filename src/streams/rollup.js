
const PLUGIN_NAME = 'drinkbar-stream-rollup'

import through from 'through2'
import gutil from 'gulp-util'
import rollup from 'rollup'
import {extend} from '../util'
import File from 'vinyl'

module.exports = function (options = {}) {
	const transform = function (file, encode, done) {
		if (file.isNull()) {
			this.push(file)
			done()
		}
		else if (file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			done()
		}
		else {
			const rollupOptions = extend({entry: file.path}, options)
			const bundleOptions = extend({format: 'iife'}, options)

			rollup.rollup(rollupOptions)
				.then(bundle => {
					const result = bundle.generate(bundleOptions)
console.log(result)

					file.content = new Buffer(result.code)
					file.sourcemap = result.map

					this.push(file)
					done()
				})
				.catch(e => {
					this.emit('error', new gutil.PluginError(PLUGIN_NAME, e.message));
					done()
				})
		}
	}

	const flush = function(done) {
		console.log('flush')

		done()
	}

	return through.obj(transform, flush)
}
