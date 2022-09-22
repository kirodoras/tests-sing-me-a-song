/* eslint-disable cypress/no-unnecessary-waiting */
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";

const PATH_FRONT = "http://localhost:3000";
const PATH_BACK = "http://localhost:5008";

beforeEach(() => {
  cy.resetDatabase();
  cy.visit(`${PATH_FRONT}/`);
});

describe('Add new recommendation', () => {
  it('should add successfully', () => {
    cy.intercept("GET", `${PATH_BACK}/recommendations`).as("getPosts");
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
    cy.intercept("GET", `${PATH_BACK}/recommendations/top/10`).as("getTop");
    cy.get('[data-cy="top"]').click();
    cy.wait("@getTop");
    cy.url().should('include', '/top');
    cy.wait(500);
  });
});

describe('Navigate to /random', () => {
  it('should navigate successfully', () => {
    cy.intercept("GET", `${PATH_BACK}/recommendations/random`).as("getRandom");
    cy.get('[data-cy="random"]').click();
    cy.wait("@getRandom");
    cy.url().should('include', '/random');
    cy.wait(500);
  });
});

describe('Navigate to /home', () => {
  it('should navigate successfully', () => {
    cy.intercept("GET", `${PATH_BACK}/recommendations`).as("getPosts");
    cy.get('[data-cy="home"]').click();
    cy.wait("@getPosts");
    cy.url().should('include', '/');
    cy.wait(500);
  });
});

describe('Upvote recommendation', () => {
  it('should upvote successfully', () => {
    cy.intercept("GET", `${PATH_BACK}/recommendations`).as("getPosts");
    const linkName = faker.lorem.words(2);
    cy.get('[data-cy="name"]').type(linkName);
    cy.get('[data-cy="youtubeLink"]').type("https://youtu.be/Tu4sXwpY6S0");
    cy.get('[data-cy="submitNew"]').click();
    cy.wait("@getPosts");
    cy.get('[data-cy="linkName"]').should('contain', linkName);
    cy.wait(500);
    cy.get('[data-cy="score"]').invoke('text').then(parseInt).then((prev) => {
      cy.get('[data-cy="upvote-button"]').click();
      cy.wait(1000);
      cy.get('[data-cy="score"]').invoke('text').then(parseInt).then((next) => {
        expect(next).to.equal(prev + 1);
      });
    });
  });
});

describe('Downvote recommendation', () => {
  it('should downvote successfully', () => {
    cy.intercept("GET", `${PATH_BACK}/recommendations`).as("getPosts");
    const linkName = faker.lorem.words(2);
    cy.get('[data-cy="name"]').type(linkName);
    cy.get('[data-cy="youtubeLink"]').type("https://youtu.be/Tu4sXwpY6S0");
    cy.get('[data-cy="submitNew"]').click();
    cy.wait("@getPosts");
    cy.get('[data-cy="linkName"]').should('contain', linkName);
    cy.wait(500);
    cy.get('[data-cy="score"]').invoke('text').then(parseInt).then((prev) => {
      cy.get('[data-cy="downvote-button"]').click();
      cy.wait(1000);
      cy.get('[data-cy="score"]').invoke('text').then(parseInt).then((next) => {
        expect(next).to.equal(prev - 1);
      });
    });
  });
});

describe('iframe', () => {
  it('should visible successfully', () => {
    cy.intercept("GET", `${PATH_BACK}/recommendations`).as("getPosts");
    const linkName = faker.lorem.words(2);
    cy.get('[data-cy="name"]').type(linkName);
    cy.get('[data-cy="youtubeLink"]').type("https://youtu.be/Tu4sXwpY6S0");
    cy.get('[data-cy="submitNew"]').click();
    cy.wait("@getPosts");
    cy.get('[data-cy="linkName"]').should('contain', linkName);
    cy.wait(500);
    cy.get('[data-cy="player"]')
      .find('iframe')
      .should('be.visible');
  });
});
