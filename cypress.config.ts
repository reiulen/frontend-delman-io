import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '1rb84a',
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
