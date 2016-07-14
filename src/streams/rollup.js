
const PLUGIN_NAME = 'rollup-stream'

var rollup = require('rollup')
var gutil = require('gulp-util')
var File = require('vinyl')
var MemoryFileSystem = require('memory-fs')
var through = require('through')
var some = require('lodash.some')

var defaultStatsOptions = {
	colors: gutil.colors.supportsColor,
	hash: false,
	timings: false,
	chunks: false,
	chunkModules: false,
	modules: false,
	children: true,
	version: true,
	cached: false,
	cachedAssets: false,
	reasons: false,
	source: false,
	errorDetails: false
}

module.exports = function (options) {
	var config = options.config || options;
	var entry = []
	var entries = Object.create(null)

	var stream = through(function (file) {
		if (file.isNull()) {
			return
		}
		if ('named' in file) {
			if (!Array.isArray(entries[file.named])) {
				entries[file.named] = []
			}
			entries[file.named].push(file.path)
		} else {
			entry = entry || []
			entry.push(file.path)
		}
	}, function () {
		var self = this
		var handleConfig = function (config) {
			config.output = config.output || {}
			config.watch = !!options.watch

			// Determine pipe'd in entry
			if (Object.keys(entries).length > 0) {
				entry = entries
				if (!config.output.filename) {
					// Better output default for multiple chunks
					config.output.filename = '[name].js'
				}
			} else if (entry.length < 2) {
				entry = entry[0] || entry
			}

			config.entry = config.entry || entry
			config.output.path = config.output.path || process.cwd()
			config.output.filename = config.output.filename || '[hash].js'
			config.watch = options.watch
			entry = []

			if (!config.entry || config.entry.length < 1) {
				gutil.log(PLUGIN_NAME + '- No files given aborting compilation')
				self.emit('end')
				return false
			}
			return true
		}

		if (!handleConfig(config)) {
			return false
		}

		var compiler = rollup.rollup(config, function (err, stats) {
			if (err) {
				self.emit('error', new gutil.PluginError(PLUGIN_NAME, err))
			}
			var jsonStats = stats.toJson() || {}
			var errors = jsonStats.errors || []
			if (errors.length) {
				var errorMessage = errors.reduce(function (resultMessage, nextError) {
					resultMessage += nextError.toString()
					return resultMessage
				}, '')
				self.emit('error', new gutil.PluginError(PLUGIN_NAME, errorMessage))
			}
		})

		var handleCompiler = function (compiler) {
			if (options.progress) {
				compiler.apply(new ProgressPlugin(function (percentage, msg) {
					percentage = Math.floor(percentage * 100)
					msg = percentage + '% ' + msg
					if (percentage < 10) msg = ' ' + msg
					gutil.log('rollup', msg)
				}))
			}

			var fs = compiler.outputFileSystem = new MemoryFileSystem()

			compiler.plugin('after-emit', function (compilation, callback) {
				Object.keys(compilation.assets).forEach(function (outname) {
					if (compilation.assets[outname].emitted) {
						var file = prepareFile(fs, compiler, outname)
						self.queue(file)
					}
				})
				callback()
			})
		}

		handleCompiler(compiler)
	})

	// If entry point manually specified, trigger that
	if (config.entry) {
		stream.end()
	}

	return stream
}

function prepareFile (fs, compiler, outname) {
	var path = fs.join(compiler.outputPath, outname)
	if (path.indexOf('?') !== -1) {
		path = path.split('?')[0]
	}

	var contents = fs.readFileSync(path)

	var file = new File({
		base: compiler.outputPath,
		path: path,
		contents: contents
	})
	return file
}

