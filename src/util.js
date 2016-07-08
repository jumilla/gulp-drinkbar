
import fs from 'fs'
import {log} from 'gulp-util'
import chalk from 'chalk'



function isGlob(path) {
	return path.match(/\*/)
}

function isValidGlobs(paths) {
	try {
		paths.forEach(path => {
			if (!isGlob(path)) {
				fs.accessSync(path, fs.F_OK)
			}
		})

		return true
	}
	catch (error) {
		log(chalk.red(error.message))
		return false
	}
}

module.exports = {
	isGlob: isGlob,
	isValidGlobs: isValidGlobs,
}