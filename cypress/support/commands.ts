// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

import ApiClient, { ApiClientType } from "src/packages/api-client";
import { localStorageKeys } from "src/packages/local-storage";
import { Endpoints } from "../endpoints";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface Chainable<Subject = any> {
      /**
       *  Window object with additional properties used during test.
       */
      window(
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<CustomWindow>;
      /**
       * Custom command to select DOM element by data-test attribute.
       * @example cy.dataTestIs('greeting')
       */
      getByTestId(value: string): Chainable<Subject>;
      getByTestIdContains(value: string): Chainable<Subject>;
      signInByApiClient(
        userType?: string
      ): Chainable<Response<Record<string, unknown>>>;
      signUp(userType?: string): Chainable<Response<Record<string, unknown>>>;
      createFarm(): Chainable<Response<Record<string, unknown>>>;
    }
  }
  interface CustomWindow extends Window {
    ApiClient: ApiClientType;
  }
}

Cypress.Commands.add("getByTestId", (selector: string, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("getByTestIdContains", (selector: string, ...args) => {
  return cy.get(`[data-testid*=${selector}]`, ...args);
});

Cypress.Commands.add("signInByApiClient", (userType?: string) => {
  const { email, password } = Cypress.env(userType || "userWithFarm");

  Cypress.log({
    name: "signIn by ApiClient",
    message: `user email ${email}`
  });

  expect(email).to.be.a("string").and.not.to.be.empty;

  if (typeof password !== "string" || !password) {
    throw new Error("Missing password value. Set it in cypress.env.json file.");
  }

  cy.wrap(ApiClient.User.signIn({ email, password })).then((result) => {
    const user = result as { sessionToken: string };
    expect(user.sessionToken).to.be.a("string").and.not.to.be.empty;
    expect(localStorage.getItem(localStorageKeys.sessionToken)).to.equal(
      user.sessionToken
    );
  });
});

Cypress.Commands.add("signUp", (userType?: string) => {
  const { email, password, firstName, lastName } = Cypress.env(
    userType || "temporaryUser"
  );

  Cypress.log({
    name: "signUp through API",
    message: `user email ${email}`
  });

  expect(email).to.be.a("string").and.not.to.be.empty;

  if (typeof password !== "string" || !password) {
    throw new Error("Missing password value. Set it in cypress.env.json file.");
  }

  return cy
    .request({
      method: "POST",
      url: Endpoints.signUp().absolute,
      headers: {
        "content-type": "application/json",
        "X-Parse-Application-Id": Cypress.env("appId")
      },
      body: {
        email,
        password,
        firstName,
        lastName
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      const user = response.body.result;
      expect(user.sessionToken).to.be.a("string").and.not.to.be.empty;
      localStorage.setItem(localStorageKeys.sessionToken, user.sessionToken);
    });
});

Cypress.Commands.add("createFarm", () => {
  const farmData = Cypress.env("temporaryFarm");

  return cy
    .request({
      method: "POST",
      url: Endpoints.createFarm().absolute,
      headers: {
        "content-type": "application/json",
        "X-Parse-Application-Id": Cypress.env("appId"),
        "X-Parse-Session-Token": localStorage.getItem(
          localStorageKeys.sessionToken
        )
      },
      body: farmData
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      const farm = response.body.result;
      expect(farm.objectId).to.be.a("string").and.not.to.be.empty;
    });
});
