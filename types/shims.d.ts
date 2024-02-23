/// <reference types="@intlify/unplugin-vue-i18n/messages" />
/// <reference types="unplugin-icons/types/vue" />
/// <reference types="unplugin-vue-macros/macros-global" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const component: DefineComponent<object, object, any>

    export default component
}
