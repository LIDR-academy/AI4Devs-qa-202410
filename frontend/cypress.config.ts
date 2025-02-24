import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Ajusta este puerto según donde esté corriendo tu aplicación frontend
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
