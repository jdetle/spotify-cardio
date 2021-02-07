describe("Playlist Creator", () => {
  beforeEach(() => {
    
  });
  it("Shows a search input ", () => {
    cy.getToken()
    cy.visit(`${Cypress.env("host")}/playlist-creator`);
    const searchInput = cy.findByRole("search-input");
    searchInput.should("be.visible");
    
  });
});
