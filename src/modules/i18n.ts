import { defaultDocument } from '@vueuse/core'
import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import { currentLocale, isChangingLocale } from '@/composables/i18n'
import type { UserModule } from '@/types/modules'
import { DEFAULT_LOCALE, getBrowserLocale, loadLocaleMessages, setI18nLocale } from '@/utils/i18n'

export const install: UserModule['install'] = async ({ use }) => {
    if (!DEFAULT_LOCALE) {
        return
    }

    let locale: string | undefined = currentLocale.value

    if (locale === 'auto' && !(locale = getBrowserLocale())) {
        locale = DEFAULT_LOCALE
    }

    defaultDocument?.querySelector('html')?.setAttribute('lang', locale)

    const i18n = createI18n({
        legacy: false,
        locale,
    })

    await loadLocaleMessages(i18n, locale)

    watch(currentLocale, async (value) => {
        const loading = setTimeout(() => (isChangingLocale.value = true), 200)

        try {
            if (value === 'auto') {
                value = getBrowserLocale() ?? DEFAULT_LOCALE
            }

            if (!i18n.global.availableLocales.includes(value)) {
                await loadLocaleMessages(i18n, value)
            }

            setI18nLocale(i18n, value)
        } finally {
            clearTimeout(loading)
            isChangingLocale.value = false
        }
    })

    use(i18n)
}
