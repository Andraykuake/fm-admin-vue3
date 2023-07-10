import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import 'ant-design-vue/dist/antd.css'
import { router } from './router/index'

// import FmIcon from './components/fm-icon/index'

// 引入
import * as Icons from '@ant-design/icons-vue'

const app = createApp(App)
// 注册
Object.keys(Icons).map((key) => {
	app.component(key, Icons[key as keyof typeof Icons])
})
app.use(router)
// app.use(FmIcon)
app.mount('#app')
