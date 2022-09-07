const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      apiBaseUrl: "http://localhost:4000",
      appBaseUrl: "http://localhost:3000",
    },
  },
});
