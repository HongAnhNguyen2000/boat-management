/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import router from './router'
import store from './store'

const app = createApp(App)

registerPlugins(app)
app.use(router)
app.use(store)

app.mount('#app')
