
import plugins from './plugins'



module.exports = {
	inProduction: plugins.util.env.production || process.env.NODE_ENV === 'production',
}
