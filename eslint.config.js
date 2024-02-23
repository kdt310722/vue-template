export default import('@kdt310722/eslint-config').then((m) => m.defineFlatConfig({}, {
    'settings': {
        'import/core-modules': ['vue-router/auto', 'vue-router/auto-routes'],
    },
    'rules': {
        'vue/valid-v-bind': 'off',
    },
}))
