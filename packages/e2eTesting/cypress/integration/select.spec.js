const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('Creates a label for the select', () => {
    const alertStub = cy.stub();
    const select = cy.get('#basicSelectId');

    cy.on('window:alert', alertStub);

    select.click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith('clicked');
    });
  });
};

describe('React 15 Input', () => {
  runTests('15');
});

describe('React 16.0 Input', () => {
  runTests('16_0');
});

describe('React 16.5 Input', () => {
  runTests('16_5');
});
