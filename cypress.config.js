const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 120000,
  includeShadowDom: true,
  scrollBehavior: false,
  viewportWidth: 2048,
  viewportHeight: 2048,
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8000'
  }
})
