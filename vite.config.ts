import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// AntDesignVue 库组件自动按需导入
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [AntDesignVueResolver()]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
			// 添加更多的别名设置
		}
	}
})
