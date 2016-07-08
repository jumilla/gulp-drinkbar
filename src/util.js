
import plugins from './plugins'
import fs from 'fs'
import {log} from 'gulp-util'
import chalk from 'chalk'



function isPluginInstalled(name, npmModule) {
	if (plugins[name] === null) {
		log(chalk.red('Please install npm module "' + npmModule + '".'))
		log(chalk.yellow('Install command is "npm install ' + npmModule + ' --save-dev"'))
		return false
	}

	return true
}

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
	isPluginInstalled: isPluginInstalled,
	isGlob: isGlob,
	isValidGlobs: isValidGlobs,
}