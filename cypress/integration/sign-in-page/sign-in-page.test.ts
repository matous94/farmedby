describe("Sign in page", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });

  describe("Sign in with valid credentials", () => {
    context("Farm created", () => {
      it("should sign in and navigate to farm page", () => {
        cy.get("#email")
          .type("matousvencl@gmail.com")
          .get("#password")
          .type("kokos")
          .get("[type=submit]")
          .click()
          .url()
          .should("include", `${Cypress.config().baseUrl}/farm/`);
      });
    });

    context("Farm not created", () => {
      it("should sign in and navigate to create farm page", () => {
        cy.get("#email")
          .type("nofarmtest@farmedby.com")
          .get("#password")
          .type("kolobezka")
          .get("[type=submit]")
          .click()
          .url()
          .should("eq", `${Cypress.config().baseUrl}/create-farm`);
      });
    });
  });

  describe("No account yet", () => {
    it("can navigate to /sign-up page", () => {
      cy.getByTestId("no-account-yet")
        .click()
        .url()
        .should("eq", `${Cypress.config().baseUrl}/sign-up`);
    });
  });

  describe("Password reset", () => {
    it("can request password reset", () => {
      cy.intercept("**/requestPasswordReset").as("requestPasswordReset");

      cy.getByTestId("open-reset-password")
        .click()
        .getByTestId("reset-password-email")
        .type("matousvencl@gmail.com{enter}");

      cy.wait("@requestPasswordReset")
        .its("response.statusCode")
        .should("eq", 200);
    });
  });

  describe("Sign up page is public only", () => {
    it("should redirect logged in user to farm page", () => {
      cy.get("#email")
        .type("matousvencl@gmail.com")
        .get("#password")
        .type("kokos")
        .get("[type=submit]")
        .click()
        .url()
        .should("include", `${Cypress.config().baseUrl}/farm/`)
        .go(-1)
        .url()
        .should("include", `${Cypress.config().baseUrl}/farm/`);
    });
  });
});
