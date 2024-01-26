type ImportMetaEnvAugmented = import('@julr/vite-plugin-validate-env').ImportMetaEnvAugmented<typeof import('../env').default>
type ImportMetaEnv = ImportMetaEnvAugmented

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_HTTPS: string
            VITE_SOURCEMAP: string

            [key: string]: string | undefined
        }
    }
}
