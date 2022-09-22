Cypress.Commands.add("resetDatabase", () => {
    cy.request("POST", "http://localhost:5008/test/reset");
});