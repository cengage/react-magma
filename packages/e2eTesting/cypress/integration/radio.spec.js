const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('finds radio options', () => {
    cy.get('#blue').should('be.visible');
    cy.get('#red').should('be.visible');
  });

  it('selects a radio in the colors group', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#blue')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('blue selected');
      });
  });

  it('selects a radio in the colors group when clicking on the label', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('label[for="blue"]')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('blue selected');
      });
  });
};

describe('React 16.5 Select', () => {
  runTests('16_5');
});
