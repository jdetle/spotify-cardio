/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Command to set a token in local storage if it doesnt exist
     * @example cy.getToken()
     */
    getToken(): void;
  }
}
