describe("Landing", () => {
  it.only("Shows the landing page with a link to go authenticate", () => {
    cy.visit(Cypress.env("host"));
    cy.findByRole("button", {
      name: /login with spotify/i,
    }).click();
    cy.wait(2000).then(() => {
      console.log("Spotify Token", localStorage.getItem("spotify-token"));
    });
  });
  it("Shows the landing page with a link to go make a playlist when the user is authenticated", () => {
    cy.getToken();
    console.log("Spotify Token", localStorage.getItem("spotify-token"));
    cy.visit(Cypress.env("host"));
    const button = cy.findByRole("button", { name: /go make a playlist/i });
    button.should("be.visible");
  });
});
