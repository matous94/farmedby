import { Routes } from "../../routes";
import { Endpoints } from "../../endpoints";

// https://docs.google.com/spreadsheets/d/1p4CdmXBDm7IKBASVU6g1b7cIV9Xx_3AgX927tcINI7Y/edit?usp=sharing

describe("Sign in page functionality", () => {
  beforeEach(() => {
    cy.visit(Routes.signIn().relative);
  });

  describe("Sign in with valid credentials", () => {
    context("User with farm", () => {
      it("should sign in and redirect to farm page", () => {
        const { email, password } = Cypress.env("userWithFarm");

        expect(email, "email value").to.be.a("string").and.not.be.empty;

        // password should not be shown in the Command log
        if (typeof password !== "string" || !password) {
          throw new Error(
            "Missing password value. Set it in cypress.env.json file."
          );
        }

        cy.intercept(Endpoints.getMyFarm().absolute).as("getMyFarm");

        cy.get("#email")
          .type(email)
          .get("#password")
          .type(password, { log: false })
          .get("[type=submit]")
          .click();

        cy.wait("@getMyFarm").then(({ response }) => {
          if (!response) {
            throw new Error(
              "getMyFarm endpoint should be called after sign-in subit"
            );
          }
          const { objectId } = response.body.result;
          cy.url().should("eq", Routes.farmLandingPage(objectId).absolute);
        });
      });
    });

    context("User without farm", () => {
      it("should sign in and redirect to create farm page", () => {
        const { email, password } = Cypress.env("userWithoutFarm");

        expect(email, "email value").to.be.a("string").not.to.be.empty;

        // password should not be shown in the Command log
        if (typeof password !== "string" || !password) {
          throw new Error(
            "Missing password value. Set it in cypress.env.json file."
          );
        }

        cy.get("#email")
          .type(email)
          .get("#password")
          .type(password, { log: false })
          .get("[type=submit]")
          .click()
          .url()
          .should("eq", Routes.createFarm().absolute);
      });
    });
  });

  it("Can navigate to sign-up page", () => {
    cy.getByTestId("no-account-yet")
      .click()
      .url()
      .should("eq", Routes.signUp().absolute);
  });

  it("Can request password reset", () => {
    cy.intercept(Endpoints.requestPasswordReset().absolute).as(
      "requestPasswordReset"
    );

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
  before(() => {
    cy.signIn();
  });

  it("should redirect user to other page", () => {
    cy.visit(Routes.signIn().relative)
      .url()
      .should("not.eq", Routes.signIn().absolute);
  });
});
