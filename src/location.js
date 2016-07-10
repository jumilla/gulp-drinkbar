
import _path from 'path'



class Location {

	constructor(dir) {
		this.base = process.cwd()
		this.dir = dir
	}

	relativePath(path) {
		return _path.relative(this.base, _path.resolve(dir, path))
	}

}



module.exports = Location
