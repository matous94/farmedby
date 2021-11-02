describe("Sign in page", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });

  describe("Fields validation", () => {});

  describe("Sign in with valid credentials", () => {
    context("Farm created", () => {
      it("should sign in and navigate to farm page", () => {
        cy.get("#email").type("matousvencl@gmail.com");
        cy.get("#password").type("kokos");
        cy.get("[type=submit]").click();
        cy.url().should("include", "farm/");
      });
    });

    context("Farm not created", () => {
      it("should sign in and navigate to create farm page", () => {});
    });
  });
});
