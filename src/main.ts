import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '@/styles/main.css'
import App from '@/App.vue'

const app = createApp(App)

installModules(app).then(() => {
    return app.mount('#app')
})
