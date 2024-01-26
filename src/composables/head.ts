import { usePreferredDark } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export function usePageHead() {
    const route = useRoute()
    const i18n = useI18n()
    const preferredDark = usePreferredDark()

    const getHead = (key: string, defaultValue?: string) => {
        if (route.meta.head?.[key]) {
            return i18n.te(route.meta.head[key]) ? i18n.t(route.meta.head[key]) : route.meta.head[key]
        }

        const translationKey = `pages.${route.name}.head.${key}`

        if (!route.name) {
            return defaultValue
        }

        return i18n.te(translationKey) ? i18n.t(translationKey) : defaultValue
    }

    useHead({
        title: () => {
            const title = getHead('title')
            const name = import.meta.env.APP_NAME

            return title ? `${title} | ${name}` : name
        },
        meta: [
            { name: 'description', content: () => getHead('description') },
        ],
        link: [
            { rel: 'icon', type: 'image/svg+xml', href: () => (preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg') },
        ],
    })
}
