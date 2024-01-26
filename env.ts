import { defineConfig } from '@julr/vite-plugin-validate-env'
import { z } from 'zod'

export default defineConfig({
    validator: 'zod',
    schema: {
        APP_NAME: z.coerce.string().default('Vue App'),
        APP_LOCALE: z.coerce.string().optional(),
    },
})
