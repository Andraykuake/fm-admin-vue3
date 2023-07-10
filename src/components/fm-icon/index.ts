import { App } from 'vue'
import FmIcon from '@/components/fm-icon/index.vue'
export default {
	install(app: App) {
		Object.keys([FmIcon]).forEach((name: string) => {
			app.component(name, FmIcon)
		})
	}
}
