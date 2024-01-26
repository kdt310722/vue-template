import { last } from '@kdt310722/utils/array'
import { type AnyObject, isKeyOf, map } from '@kdt310722/utils/object'
import { capitalize } from '@kdt310722/utils/string'
import type { MaybeRefOrGetter } from '@vueuse/core'
import { defaultDocument, defaultWindow, toValue } from '@vueuse/core'
import { isRef } from 'vue'
import type { I18n } from 'vue-i18n'

export function normalizeLocale(locale: MaybeRefOrGetter<string>) {
    return toValue(locale).replaceAll('_', '-').split('-')[0].toLowerCase()
}

const locales = map(import.meta.glob<AnyObject>('@/../locales/*.{js,ts,json,json5,yml,yaml}', { import: 'default' }), (path: string, importer) => {
    return [normalizeLocale(last(path.split('/')).split('.')[0]), importer]
})

export const SUPPORTED_LOCALES = Object.keys(locales)

export const DEFAULT_LOCALE = (import.meta.env.APP_LOCALE ?? SUPPORTED_LOCALES[0])

export function getBrowserLocale() {
    let locale = defaultWindow?.navigator.language

    if (!locale || !isKeyOf(locales, (locale = normalizeLocale(locale)))) {
        return
    }

    return locale
}

export function getLocaleDisplayName(locale: MaybeRefOrGetter<string>) {
    locale = toValue(locale)

    const formatter = new Intl.DisplayNames([locale], {
        type: 'language',
    })

    return formatter.of(locale) ?? capitalize(locale)
}

export async function loadLocaleMessages(i18n: I18n, locale: MaybeRefOrGetter<string>) {
    locale = toValue(locale)

    if (!isKeyOf(locales, locale)) {
        return
    }

    i18n.global.setLocaleMessage(locale, await locales[locale]())
}

export function setI18nLocale(i18n: I18n, locale: MaybeRefOrGetter<string>) {
    locale = toValue(locale)

    if (!isKeyOf(locales, locale)) {
        return
    }

    if (isRef(i18n.global.locale)) {
        i18n.global.locale.value = locale
    } else {
        i18n.global.locale = locale
    }

    if (defaultDocument) {
        defaultDocument.documentElement.lang = locale
    }
}
