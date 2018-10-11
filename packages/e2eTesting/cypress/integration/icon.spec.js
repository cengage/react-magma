const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('Displays an icon', () => {
    const icon = cy.get('#basicInfoIcon').parent();

    icon.should('be.visible');
  });
};

describe('React 15 Icon', () => {
  runTests(15);
});

describe('React 16 Icon', () => {
  runTests(16);
});
