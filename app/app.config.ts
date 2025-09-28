export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'cyan',
      neutral: 'neutral',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
  },
})
