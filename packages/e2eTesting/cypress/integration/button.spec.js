const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('Displays and interacts with button', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const message = 'Default Button';
    cy.contains(message).as('button');

    cy.get('@button').should('be.visible');

    cy.get('@button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('clicked');
      });
  });

  it('Cannot click on disabled button', () => {
    const message = 'Disabled Button';
    cy.contains(message)
      .should('be.visible')
      .and('be.disabled');
  });
};

describe('React 15 Button', () => {
  runTests('15');
});

describe('React 16.0 Button', () => {
  runTests('16_0');
});

describe('React 16.5 Button', () => {
  runTests('16_5');
});
