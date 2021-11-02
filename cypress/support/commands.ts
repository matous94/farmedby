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

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Chainable<Subject = any> {
    /**
     * Custom command to select DOM element by data-test attribute.
     * @example cy.dataTestIs('greeting')
     */
    getByTestId(value: string): Chainable<Subject>;
    getByTestIdContains(value: string): Chainable<Subject>;
  }
}

Cypress.Commands.add("getByTestId", (selector: string, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("getByTestIdContains", (selector: string, ...args) => {
  return cy.get(`[data-testid*=${selector}]`, ...args);
});
