
import plugins from './plugins'

module = {
	inProduction: plugins.util.env.production || process.env.NODE_ENV === 'production',
}

