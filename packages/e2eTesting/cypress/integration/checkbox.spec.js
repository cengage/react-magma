describe('Checkbox', () => {
  beforeEach(() => {
    cy.visit(`/react_16_5.html`);
  });

  it('Displays and interacts with checkbox', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const checkbox = cy.get('#defaultCheckbox');

    checkbox.should('be.visible');

    checkbox.click({ force: true }).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith('clicked');
    });
  });

  it('Makes an checkbox required', () => {
    const checkbox = cy.get('#requiredCheckbox');

    checkbox.should('have.attr', 'required');
  });

  it('Makes an checkbox disabled', () => {
    const checkbox = cy.get('#disabledCheckbox');

    checkbox.should('have.attr', 'disabled');
  });
});
