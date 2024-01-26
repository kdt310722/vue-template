<script lang="ts" setup>
    import type { Component } from 'vue'
    import { type ButtonVariantProps, buttonVariants } from '@/components/ui/button/button'

    interface Props {
        tag?: Component | string
        size?: ButtonVariantProps['size']
        variant?: ButtonVariantProps['variant']
        shape?: ButtonVariantProps['shape']
    }

    withDefaults(defineProps<Props>(), {
        tag: 'button',
    })
</script>

<template>
    <component :is="tag" :class="cn(buttonVariants({ size, variant, shape }), $attrs.class ?? '')">
        <slot />
    </component>
</template>
