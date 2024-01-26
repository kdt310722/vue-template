import type { PathLike } from 'node:fs'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import { isTrueLike } from '@kdt310722/utils/common'
import { dirname } from '@kdt310722/utils/node'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { type UserConfig, defineConfig } from 'vite'
import MkCert from 'vite-plugin-mkcert'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'

const cwd = (...path: PathLike[]) => dirname(import.meta, ...path)

export default defineConfig((): UserConfig => ({
    define: {},
    plugins: [
        AutoImport({
            imports: [
                '@vueuse/core',
                '@vueuse/head',
                'pinia',
                'vue',
                'vue-i18n',
                'vue/macros',
                VueRouterAutoImports,
                { 'vue-router/auto': ['useLink'] },
            ],
            dirs: [cwd('src/composables/**'), cwd('src/stores/**'), cwd('src/utils/**')],
            dts: cwd('types/auto-imports.d.ts'),
            vueTemplate: true,
        }),
        Components({
            dirs: [cwd('src/components')],
            resolvers: [IconsResolver()],
            dts: cwd('types/components.d.ts'),
        }),
        Icons({ compiler: 'vue3' }),
        isTrueLike(process.env.VITE_HTTPS) ? [MkCert({ autoUpgrade: true })] : [],
        Layouts(),
        ValidateEnv(),
        VueMacros({
            reactivityTransform: true,
            plugins: {
                vue: Vue(),
                vueJsx: VueJsx(),
            },
        }),
        VueI18n({ include: [cwd('locales/**')], jitCompilation: true }),
        VueDevTools(),
        VueRouter({ dts: cwd('types/typed-router.d.ts') }),
        WebfontDownload([], { injectAsStyleTag: false }),
        UnoCSS(),
    ],
    resolve: {
        alias: {
            '@/': cwd('src/'),
        },
    },
    css: {
        devSourcemap: true,
        transformer: 'lightningcss',
        lightningcss: {},
    },
    esbuild: {
        legalComments: 'none',
    },
    envPrefix: 'APP_',
    build: {
        sourcemap: isTrueLike(process.env.VITE_SOURCEMAP),
    },
}))
