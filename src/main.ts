import { createApp } from 'vue'
import '@/assets/css/style.css'
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import { router } from './router/index'
import { createPinia } from 'pinia'

// 引入
import components from './install'

const app = createApp(App)
app.use(components)
app.use(createPinia())
app.use(router)

// app.use(FmIcon)
app.mount('#app')
