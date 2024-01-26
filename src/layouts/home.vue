<template>
    <header class="*ctn *fcc flex-col py-6 space-y-6">
        <img alt="Vue App" class="size-16" src="@/assets/images/logo.svg">
        <h1 class="text-xl font-medium">Vite + Typescript + Vue</h1>
    </header>

    <main class="*ctn">
        <RouterView />
    </main>

    <footer class="*ctn py-6 space-y-4">
        <TheFooter />
        <p class="text-center text-sm opacity-50">[Home Layout]</p>
    </footer>
</template>
