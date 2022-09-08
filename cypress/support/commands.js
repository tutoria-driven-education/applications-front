Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", `${Cypress.env("apiBaseUrl")}/tests/reset-database`).as(
    "resetDatabase"
  );
});

Cypress.Commands.add("visitPage", (params = "") => {
  cy.visit(Cypress.env("appBaseUrl") + params);
});

Cypress.Commands.add("resetLocalStorage", (params = "") => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});
