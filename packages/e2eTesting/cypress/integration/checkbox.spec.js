const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('Displays and interacts with checkbox', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const checkbox = cy.get('#defaultCheckbox');

    checkbox.should('be.visible');

    checkbox.click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith('clicked');
    });
  });

  it('Makes an checkbox required', () => {
    const checkbox = cy.get('#requiredCheckbox');

    checkbox.should('have.attr', 'required');
  });

  it('Makes an checkbox disabled', () => {
    const message = 'disabled';
    const checkbox = cy.get('#disabledCheckbox');

    checkbox.should('have.attr', 'disabled');
  });
};

describe('React 15 checkbox', () => {
  runTests('15');
});

describe('React 16.0 checkbox', () => {
  runTests('16_0');
});

describe('React 16.5 checkbox', () => {
  runTests('16_5');
});
