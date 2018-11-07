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

// describe('React 15 Input', () => {
//   runTests('15');
// });

// describe('React 16.0 Input', () => {
//   runTests('16_0');
// });

describe('React 16.5 Input', () => {
  runTests('16_5');
});
