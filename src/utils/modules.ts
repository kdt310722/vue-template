import { isFunction } from '@kdt310722/utils/function'
import { isKeyOf, isObject } from '@kdt310722/utils/object'
import type { App } from 'vue'
import type { UserModule } from '@/types/modules'

export function isUserModule(input: unknown): input is UserModule {
    return isObject(input) && isKeyOf(input, 'install') && isFunction(input.install)
}

export async function getEnabledModules(): Promise<UserModule[]> {
    const modules = await Promise.all(Object.values(import.meta.glob('@/modules/*.ts')).map((m) => m()))

    return modules.filter(isUserModule).sort((a, b) => (
        (b.priority ?? 0) - (a.priority ?? 0)
    ))
}

export async function installModules(app: App) {
    const modules = await getEnabledModules()

    for (const module of modules) {
        await module.install(app)
    }
}
