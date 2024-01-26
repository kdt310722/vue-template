<script lang="ts" setup>
    const { t } = useI18n()
</script>

<template>
    <div class="*fcc flex-col space-y-4">
        <div class="*fcc space-x-2">
            <RouterLink class="text-sm" to="/">{{ t('pages./.head.title') }}</RouterLink>
            <RouterLink class="text-sm" to="/test">{{ t('pages./test.head.title') }}</RouterLink>
        </div>

        <div class="*fcc space-x-2">
            <ColorModeButton />
            <LocaleButton />
        </div>
    </div>
</template>
