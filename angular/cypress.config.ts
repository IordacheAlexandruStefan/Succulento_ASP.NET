const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200", // Adaptează portul dacă folosești altul
    setupNodeEvents(on, config) {
      // Aici poți seta event listeners dacă este nevoie
    },
  },
});