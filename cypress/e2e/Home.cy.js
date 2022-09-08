describe("Home page", () => {
  before(() => {
    cy.visitPage();
    cy.resetLocalStorage();
    cy.resetDatabase();
  });

  describe("interface", () => {
    it("should display the header", () => {
      const header = cy.get("header");

      header.should("be.visible");
      header.should("contain", "Applications");
    });

    it("should display the login box", () => {
      const loginBox = cy.get('[data-cy="login-box"]');

      loginBox.should("be.visible");
    });

    it("should display the input for password", () => {
      const passwordInput = cy.get(
        '[data-cy="login-box"] input[name="password"]'
      );

      passwordInput.should("be.visible");
      passwordInput.should(
        "have.attr",
        "placeholder",
        "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
      );

      const label = cy.get('[data-cy="login-box"] label');

      label.should("be.visible");
      label.should("contain", "Senha de acesso");
    });

    it("should display the button to login", () => {
      const button = cy.get('[data-cy="login-box"] button');

      button.should("be.visible");
      button.should("contain", "Entrar");
      button.should("have.attr", "type", "submit");
      button.should("have.attr", "disabled");
    });
  });

  describe("navigation", () => {
    it("should change button state when password is filled", () => {
      const passwordInput = cy.get(
        '[data-cy="login-box"] input[name="password"]'
      );
      const button = cy.get('[data-cy="login-box"] button');

      passwordInput.type("XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX");
      button.should("not.have.attr", "disabled");
    });
  });
});
