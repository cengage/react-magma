const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('Displays an icon', () => {
    cy.get('#basicInfoIcon')
      .parent()
      .should('be.visible');
  });
};

describe('React 15 Icon', () => {
  runTests('15');
});

describe('React 16.0 Icon', () => {
  runTests('16_0');
});

describe('React 16.5 Icon', () => {
  runTests('16_5');
});
