/* eslint-disable cypress/no-unnecessary-waiting */
Cypress.Commands.add("resetDatabase", () => {
    cy.request("POST", "http://localhost:5008/test/reset");
});

Cypress.Commands.add("createRecommendation", (path, name) => {
    cy.intercept("GET", `${path}/recommendations`).as("getPosts");
    const linkName = name;
    cy.get('[data-cy="name"]').type(linkName);
    cy.get('[data-cy="youtubeLink"]').type("https://youtu.be/Tu4sXwpY6S0");
    cy.get('[data-cy="submitNew"]').click();
    cy.wait("@getPosts");
    cy.get('[data-cy="linkName"]').should('contain', linkName);
    cy.wait(500);
});