/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
        addIngredient(ingredientId: string): Chainable<any>;
        removeIngredient(ingredientId: string): Chainable<any>;
        loginMock():Chainable<any>
    }
  }
}

Cypress.Commands.add('addIngredient', (ingredientId: string) => {
  cy.get(`[data-testid="${ingredientId}"]`).contains('Добавить').click();
  cy.get('[data-testid=burger-ingredients]')
    .find(`[data-testid="${ingredientId}"]`, { timeout: 1000 })
    .should('exist');
});

Cypress.Commands.add('removeIngredient', (ingredientId: string) => {
  cy.get(`[data-testid=constructor-${ingredientId}]`)
    .find('.constructor-element__action')
    .click();

  cy.get(`[data-testid=constructor-${ingredientId}]`, { timeout: 1000 })
    .should('not.exist');
});

Cypress.Commands.add('loginMock', () => {
  const accessToken = 'Bearer faketoken123';
  const refreshToken = 'fakerefreshtoken456';

  cy.setCookie('accessToken', accessToken);
  window.localStorage.setItem('refreshToken', refreshToken);
});

export {};
