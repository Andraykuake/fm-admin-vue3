import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import 'ant-design-vue/dist/antd.css'
import { router } from './router/index'

// import FmIcon from './components/fm-icon/index'

const app = createApp(App)
app.use(router)
// app.use(FmIcon)
app.mount('#app')
