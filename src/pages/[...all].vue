<script lang="ts" setup>
    definePage({
        meta: {
            layout: 'blank',
            head: {
                title: 'errors.404.name',
            },
        },
    })

    const { t } = useI18n()
</script>

<template>
    <main class="*fcc min-h-full">
        <div class="*ctn py-8">
            <div class="*fcc">
                <p class="*text-muted border-r pr-4 text-lg tracking-wider">{{ t('errors.404.code') }}</p>
                <p class="*text-muted pl-4 text-lg tracking-wider uppercase">{{ t('errors.404.name') }}</p>
            </div>
        </div>
    </main>
</template>
