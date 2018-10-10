const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('Displays and interacts with icon', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const icon = cy.get('#basicInfoIcon').parent();

    icon.should('be.visible');

    icon.click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith('clicked');
    });
  });
};

describe('React 15 Icon', () => {
  runTests(15);
});

describe('React 16 Icon', () => {
  runTests(16);
});
