import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { SUPPORTED_LOCALES, normalizeLocale } from '@/utils/i18n'

export const isChangingLocale = ref(false)

export const currentLocale = useStorage('locale', 'auto', undefined, {
    serializer: {
        read: (value) => (SUPPORTED_LOCALES.includes((value = normalizeLocale(value))) ? value : 'auto'),
        write: (value) => value,
    },
})
