// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt-specific configuration
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@compodium/nuxt',
    '@vueuse/nuxt',
  ],
  experimental: {
    componentIslands: true,
    typedPages: true,
    sharedPrerenderData: true,
  },
  typescript: { typeCheck: true },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-05-15',

  // Module configuration

  // https://eslint.nuxt.com/
  eslint: {
    config: {
      standalone: false,
    },
  },
  // // https://nuxtseo.com/docs/schema-org/getting-started/introduction
  // schemaOrg: {
  //   enabled: false,
  // },
  // linkChecker: {
  //   runOnBuild: false,
  // },
})
