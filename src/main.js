import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import i18n from './locales/index.js'

/**
 * 创建Vue应用实例并配置国际化
 * Create Vue app instance and configure internationalization
 */
const app = createApp(App)
app.use(i18n)
app.mount('#app')