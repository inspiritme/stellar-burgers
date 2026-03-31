describe('Работа модальных окон', () => {

  const modal = '[data-testid=modal]';
  const modalCloseBtn = '[data-testid=modal-close-btn]';
  const modalOverlay  = '[data-testid=modal-overlay]';

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {fixture:'ingredients.json'}).as('ingredients');
    cy.visit('/');
    cy.wait(['@ingredients']);
    cy.viewport(1300, 1200);
    cy.get(`${modal}`).should('not.exist')
  })
  
  describe('Открытие модального окна', () => {
    it('Открытие модального окна по нажатию на ингредиент', () => {
      cy.get('[data-testid=bun-1]').click();
      cy.get(`${modal}`).should('exist').should('be.visible');
    })
  })

  describe('Закрытие модального окна', () => {
    beforeEach(() => {
      cy.get('[data-testid=bun-1]').click();
    })

    it('Закрытие модального окна по крестику', () => {
      cy.get(`${modalCloseBtn}`).click();
    })

    it('Закрытие модального окна по оверлею', () => {
      cy.get(`${modalOverlay}`).click({ force: true });
    })

    it('Закрытие модального окна по нажатию клавишы ESC', () => {
      cy.get('body').type('{esc}');
    })

    afterEach(() => {
      cy.get(`${modal}`).should('not.exist');
    })
  })

})