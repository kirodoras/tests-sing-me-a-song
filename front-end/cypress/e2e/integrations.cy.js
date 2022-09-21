/* eslint-disable cypress/no-unnecessary-waiting */
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";

const PATH = "http://localhost:3001";

beforeEach(() => {
  cy.visit(`${PATH}/`);
});

describe('Add new recommendation', () => {
  it('should add successfully', () => {
    cy.intercept("GET", "http://localhost:5009/recommendations").as("getPosts");
    const linkName = faker.lorem.words(2);
    cy.get('[data-cy="name"]').type(linkName);
    cy.get('[data-cy="youtubeLink"]').type("https://youtu.be/Tu4sXwpY6S0");
    cy.get('[data-cy="submitNew"]').click();
    cy.wait("@getPosts");
    cy.get('[data-cy="linkName"]').should('contain', linkName);
    cy.wait(500);
  });
});

describe('Navigate to /top', () => {
  it('should navigate successfully', () => {
    cy.intercept("GET", "http://localhost:5009/recommendations/top/10").as("getTop");
    cy.get('[data-cy="top"]').click();
    cy.wait("@getTop");
    cy.url().should('include', '/top');
    cy.wait(500);
  });
});

describe('Navigate to /random', () => {
  it('should navigate successfully', () => {
    cy.intercept("GET", "http://localhost:5009/recommendations/random").as("getRandom");
    cy.get('[data-cy="random"]').click();
    cy.wait("@getRandom");
    cy.url().should('include', '/random');
    cy.wait(500);
  });
});
