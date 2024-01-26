<script lang="ts" setup>
    definePage({
        meta: {
            layout: 'home',
        },
    })

    const { t } = useI18n()
    const buttonProps = ref<any>({ size: 'md', variant: 'primary', shape: 'square' })

    const selects = [
        { type: 'size', options: ['sm', 'md', 'lg'] },
        { type: 'variant', options: ['primary', 'secondary', 'soft', 'ghost'] },
        { type: 'shape', options: ['square', 'rounded', 'circle'] },
    ]

    const onChange = (type: string, event: Event) => {
        if (event.target instanceof HTMLSelectElement) {
            buttonProps.value[type] = event.target.value
        }
    }
</script>

<template>
    <div class="*ctn py-6">
        <div class="*fcc flex-col space-y-6">
            <div class="*fcc space-x-4">
                <select v-for="(item, i) in selects" :key="i" @change="(e) => onChange(item.type, e)">
                    <option v-for="(option, j) in item.options" :key="j" :selected="buttonProps[item.type][option]">
                        {{ option }}
                    </option>
                </select>
            </div>

            <Button v-bind="buttonProps">{{ t('pages./.hello') }}</Button>
        </div>
    </div>
</template>
