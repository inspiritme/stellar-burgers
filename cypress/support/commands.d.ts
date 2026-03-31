declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Добавляет ингредиент в конструктор
     * @param ingredientId - id ингредиента
     */
    addIngredient(ingredientId: string): Chainable<any>;
  }
}