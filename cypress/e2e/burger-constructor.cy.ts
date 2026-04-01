import { SELECTORS as $ } from "cypress/support/selectors";

describe('Конструктор бургеров', () => {
  
  beforeEach(() => {
    cy.viewport(1300, 1200);
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('auth');
    cy.intercept('GET', '/api/ingredients', {fixture:'ingredients.json'}).as('ingredients');
    cy.loginMock();
    cy.visit('/');
    cy.wait(['@auth', '@ingredients']);
  })

  it('Добавление ингредиента в конструктор', () => {
    cy.get($.ingredients.bun2).contains('Добавить').click();
    cy.get($.ingredients.main1).contains('Добавить').click();
    cy.get($.ingredients.sauce1).contains('Добавить').click();
    cy.get($.ingredients.main2).contains('Добавить').click();

    cy.get($.ingredients.element).first().contains('bun-2').should('exist');
    cy.get($.ingredients.element).last().contains('bun-2').should('exist');
    cy.get($.ingredients.element).eq(1).contains('main-1').should('exist');
    cy.get($.ingredients.element).eq(2).contains('sauce-1').should('exist');
    cy.get($.ingredients.element).eq(3).contains('main-2').should('exist');

    cy.get($.ingredients.element).should('have.length', 5);
  })

  it('Удаление ингредиента из конструктора', () => {
    cy.addIngredient('main-2');
    cy.get('[data-testid=constructor-main-2]')
      .find('.constructor-element__action')
      .click();
  })

   it('Оформление заказа с авторизацией', () => {
    cy.addIngredient("bun-1");
    cy.addIngredient("main-1");
    cy.addIngredient("sauce-1");
    
    cy.intercept('POST', '**/orders', {fixture:'order.json'}).as('order');
    cy.contains('Оформить заказ').click();
    cy.wait('@order').then((interception) => {
        const body = interception.request.body;
        const response = interception.response?.body;
        expect(body.ingredients).to.have.length(4);
        expect(response.order.number).to.equal(3333);
    });

    cy.get($.modal).should('exist');
    cy.get($.modalCloseBtn).click();
    cy.get($.modal).should('not.exist');

    cy.get($.ingredients.element).should('have.length', 0);
  })
})