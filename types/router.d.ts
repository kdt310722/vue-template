import 'vue-router'

export {}

declare module 'vue-router' {
    interface RouteMeta {
        layout?: string
        head?: {
            title?: string
            description?: string
        }
    }
}
