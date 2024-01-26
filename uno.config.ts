import { presetForms } from '@julr/unocss-preset-forms'
import { theme } from '@unocss/preset-wind'
import { defineConfig, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetExtra } from 'unocss-preset-extra'
import transformerAlias from 'unocss-transformer-alias'

export default defineConfig({
    shortcuts: [
        {
            'ctn': 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
            'bg': 'bg-slate-100 dark:bg-slate-900',
            'text': 'text-slate-900 dark:text-slate-100',
            'text-muted': 'text-slate-400 dark:text-slate-500',
        },

        // Flex layout, e.g. `ifcc` -> `inline-flex justify-center items-center`
        [
            /^(i?f)([a-ces])([ces])$/,
            ([, f, j, i]) => {
                const specifiers = { a: 'around', b: 'between', c: 'center', e: 'end', s: 'start' }
                const flex = f === 'if' ? 'inline-flex' : 'flex'

                return [flex, `justify-${specifiers[j]}`, `items-${specifiers[i]}`].join(' ')
            },
        ],
    ],
    theme: {
        fontFamily: {
            sans: `Inter, ${theme.fontFamily?.sans ?? 'sans-serif'}`,
        },
    },
    autocomplete: {
        templates: ['(f|if)(a|b|c|e|s)(c|e|s)'],
    },
    presets: [presetUno(), presetIcons(), presetTypography(), presetForms(), presetExtra()],
    transformers: [transformerVariantGroup(), transformerDirectives(), transformerAlias()],
    content: {
        pipeline: {
            include: ['./**/*.{jsx,tsx,vue,html}', './src/components/**/*.{js,ts}'],
        },
    },
})
