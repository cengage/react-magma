describe('Radio', () => {
  beforeEach(() => {
    cy.visit(`/react_16_5.html`);
  });

  it('finds radio options', () => {
    cy.get('input[value="red"]').should('be.visible');
    cy.get('input[value="blue"]').should('be.visible');
  });

  it('selects a radio in the colors group', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#blue')
      .click({ force: true })
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('blue selected');
      });
  });

  it('selects a radio in the colors group when clicking on the label', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('label[for="blue"]')
      .click({ force: true })
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('blue selected');
      });
  });
});
