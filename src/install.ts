/**
 * 通用组件安装
 */
import { App } from 'vue'
import * as AIcons from '@ant-design/icons-vue'

export default {
	install(app: App) {
		Object.keys(AIcons).forEach((name: any) => {
			app.component(name, AIcons[name])
		})
	}
}
