import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import type { UserModule } from '@/types/modules'

export const install: UserModule['install'] = ({ use }) => {
    const router = createRouter({
        history: createWebHistory(),
        extendRoutes: (routes) => setupLayouts(routes),
    })

    use(router)
}
