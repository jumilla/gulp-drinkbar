
import plugins from './plugins'



export default {
	inProduction: plugins.util.env.production || process.env.NODE_ENV === 'production',
}
