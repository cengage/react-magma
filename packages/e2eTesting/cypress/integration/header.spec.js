const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('Displays a h1', () => {
    const input = cy.get('#header1');

    input.should('be.visible');
  });

  it('Displays a h2', () => {
    const input = cy.get('#header2');

    input.should('be.visible');
  });

  it('Displays a h3', () => {
    const input = cy.get('#header3');

    input.should('be.visible');
  });

  it('Displays a h4', () => {
    const input = cy.get('#header4');

    input.should('be.visible');
  });

  it('Displays a h5', () => {
    const input = cy.get('#header5');

    input.should('be.visible');
  });

  it('Displays a h6', () => {
    const input = cy.get('#header6');

    input.should('be.visible');
  });
};

describe('React 15 Header', () => {
  runTests('15');
});

describe('React 16.0 Header', () => {
  runTests('16_0');
});

describe('React 16.5 Header', () => {
  runTests('16_5');
});
