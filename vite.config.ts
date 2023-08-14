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
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname, '')
			// 添加更多的别名设置
		}
	},
	server: {
		proxy: {
			'/admin': {
				target: 'http://localhost', // 将请求转发到的目标服务器
				changeOrigin: true, // 设置为 true，以便接受来自不同源的请求
				rewrite: (path) => path.replace(/^\/admin/, '/admin') // 将请求路径中的 '/api' 替换为空字符串
			}
		}
	}
})
