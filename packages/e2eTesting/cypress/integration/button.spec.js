const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('Displays and interacts with button', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const message = 'Default Button';
    const button = cy.contains(message);

    button.should('be.visible');

    button.click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith('clicked');
    });
  });

  it('Cannot click on disabled button', () => {
    const message = 'Disabled Button';
    const button = cy.contains(message);

    button.should('be.visible');
    button.should('be.disabled');
  });
};

// describe('React 15 Input', () => {
//   runTests('15');
// });

// describe('React 16.0 Input', () => {
//   runTests('16_0');
// });

describe('React 16.5 Input', () => {
  runTests('16_5');
});
