<script lang="ts" setup>
    const { store } = useColorMode<string>()
    const { state, next } = useCycleList(['dark', 'light', 'auto'], { initialValue: store })

    const colorModeIcon = computed(() => {
        if (store.value === 'auto') {
            return 'i-mdi-laptop'
        }

        return store.value === 'dark' ? 'i-mdi-weather-night' : 'i-mdi-weather-sunny'
    })

    watch(state, (value) => {
        store.value = value
    })
</script>

<template>
    <Button shape="circle" size="sm" type="button" variant="ghost" @click="() => next()">
        <i :class="colorModeIcon" class="size-6" />
    </Button>
</template>
