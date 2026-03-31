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
    cy.get('[data-testid=bun-2]').contains('Добавить').click();
    cy.get('[data-testid=main-1]').contains('Добавить').click();
    cy.get('[data-testid=sauce-1]').contains('Добавить').click();
    cy.get('[data-testid=main-2]').contains('Добавить').click();

    cy.get('.constructor-element').first().contains('bun-2').should('exist');
    cy.get('.constructor-element').last().contains('bun-2').should('exist');
    cy.get('.constructor-element').eq(1).contains('main-1').should('exist');
    cy.get('.constructor-element').eq(2).contains('sauce-1').should('exist');
    cy.get('.constructor-element').eq(3).contains('main-2').should('exist');

    cy.get('.constructor-element').should('have.length', 5);
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

    const modal = '[data-testid=modal]';
    const modalCloseBtn = '[data-testid=modal-close-btn]';

    cy.get(`${modal}`).should('exist');
    cy.get(`${modalCloseBtn}`).click();
    cy.get(`${modal}`).should('not.exist');

    cy.get('.constructor-element').should('have.length', 0);
  })
})