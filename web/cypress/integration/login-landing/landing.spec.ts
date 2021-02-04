describe("Landing", () => {
  beforeEach(() => {});
  it("Shows the landing page with a link to go authenticate", () => {
    cy.visit(Cypress.env("host"));
    const button = cy.findByRole("button", {
      name: /login with spotify/i,
    });
    button.should("be.visible");
  });
  it("Shows the landing page with a link to go make a playlist when the user is authenticated", () => {
    cy.getToken();
    cy.visit(Cypress.env("host"));
    const button = cy.findByRole("button", { name: /go make a playlist/i });
    button.should("be.visible");
  });
});
