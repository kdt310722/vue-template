import type { Awaitable } from '@kdt310722/utils/promise'
import type { App } from 'vue'

export interface UserModule {
    priority?: number
    install: (app: App) => Awaitable<void>
}
