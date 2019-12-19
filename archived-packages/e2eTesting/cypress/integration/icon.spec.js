describe('Icon', () => {
  beforeEach(() => {
    cy.visit(`/react_16_5.html`);
  });

  it('Displays an icon', () => {
    cy.get('#basicInfoIcon')
      .parent()
      .should('be.visible');
  });
});
