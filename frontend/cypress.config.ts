import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'cypress/integration/**/*.js',
    setupNodeEvents(on, config) {
      // implementa los eventos de nodo aquí
    },
    supportFile: false,
  },
});
