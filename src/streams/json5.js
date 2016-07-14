
import json5 from 'json5'
import gutil from 'gulp-util'
import through from 'through2'
import objectAssign from 'object-assign'
import BufferStreams from 'bufferstreams'



let PluginError = gutil.PluginError
const PLUGIN_NAME = 'gulp-json5'



function json52json(buffer, options) {
	var contents = buffer.toString('utf8')

	var object = json5.parse(contents)
	var json = JSON.stringify(object)

	return new Buffer(json)
}



export default function (options) {
	options = objectAssign({}, {safe: true, replacer: null, space: null}, options)
	var providedFilename = options.filename

	return through.obj(function (file, enc, callback) {
		if (!providedFilename) {
			options.filename = file.path
		}

		if (file.isBuffer()) {
			if (file.contents.length === 0) {
				this.emit('error', new PluginError(PLUGIN_NAME, 'File ' + file.path +
						' is empty. JSON5 loader cannot load empty content'))
				return callback()
			}
			try {
				file.contents = json52json(file.contents, options)
				file.path = gutil.replaceExtension(file.path, '.json')
			}
			catch (error) {
				this.emit('error', new PluginError(PLUGIN_NAME, error, {showStack: true}))
				return callback()
			}
		}
		else if (file.isStream()) {
			let streamer = new BufferStreams((err, buf, cb) => {
				if (err) {
					this.emit('error', new PluginError(PLUGIN_NAME, err, {showStack: true}))
				}
				else {
					if (buf.length === 0) {
						this.emit('error', new PluginError(PLUGIN_NAME, 'File ' + file.path +
								' is empty. JSON5 loader cannot load empty content'))
					}
					else {
						try {
							var parsed = json52json(buf, options)
							file.path = gutil.replaceExtension(file.path, '.json')
							cb(null, parsed)
						}
						catch (error) {
							this.emit('error', new PluginError(PLUGIN_NAME, error, {showStack: true}))
						}
					}
				}
			})

			file.contents = file.contents.pipe(streamer)
		}

		this.push(file)
		callback()
	})
}
