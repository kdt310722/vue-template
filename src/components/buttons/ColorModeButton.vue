<script lang="ts" setup>
    import type { BasicColorSchema } from '@vueuse/core'

    const modes: BasicColorSchema[] = ['auto', 'light', 'dark']

    const icons = {
        auto: 'i-mdi-laptop',
        light: 'i-mdi-weather-sunny',
        dark: 'i-mdi-weather-night',
    }

    const { t } = useI18n()
    const { store } = useColorMode()
    const { state, next } = useCycleList(modes, { initialValue: store })
    const colorModeIcon = computed(() => icons[store.value])

    watch(state, (value: BasicColorSchema) => {
        store.value = value
    })
</script>

<template>
    <Button :title="t(`buttons.color-mode.${store}`)" shape="circle" size="sm" type="button" variant="ghost" @click="() => next()">
        <i :class="colorModeIcon" class="size-6" />
    </Button>
</template>
