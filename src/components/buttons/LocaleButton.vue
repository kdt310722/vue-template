<script lang="ts" setup>
    const { state, next } = useCycleList(['auto', ...SUPPORTED_LOCALES], { initialValue: currentLocale })

    watch(state, (locale) => {
        currentLocale.value = locale
    })

    const name = computed(() => {
        return getLocaleDisplayName(currentLocale.value === 'auto' ? (getBrowserLocale() ?? DEFAULT_LOCALE) : currentLocale.value)
    })
</script>

<template>
    <Button :title="name" shape="circle" size="sm" type="button" variant="ghost" @click="() => next()">
        <IMaterialSymbolsLanguage class="size-6" />
    </Button>
</template>
