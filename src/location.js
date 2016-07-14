
import path from 'path'



export default class Location {

	constructor(directoryPath = null) {
		this.root = process.cwd()
		this.current = directoryPath || this.root
	}

	relativePath(_path) {
		const ROOT_PREFIX = 'root:'

		if (_path.lastIndexOf(ROOT_PREFIX, 0) === 0) {
			_path = _path.slice(ROOT_PREFIX.length)
			return path.relative(this.root, path.resolve(this.root, _path))
		}
		else {
			return path.relative(this.root, path.resolve(this.current, _path))
		}
	}

}

Location.root = new Location()
