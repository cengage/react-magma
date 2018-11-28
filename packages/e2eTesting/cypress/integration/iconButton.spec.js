describe('React 16.5 Icon Button', () => {
  beforeEach(() => {
    cy.visit(`/react_16_5.html`);
  });

  it('Displays and interacts with icon button', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#defaultIconButton').should('be.visible');
    cy.get('#defaultIconButton')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('clicked');
      });
  });

  it('Cannot click on disabled button', () => {
    cy.get('#disabledIconButton')
      .should('be.visible')
      .and('be.disabled');
  });

  it('Displays and interacts with icon button with text', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const message = 'Default Icon Button With Text';
    cy.contains(message).as('button');

    cy.get('@button').should('be.visible');

    cy.get('@button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('clicked');
      });
  });

  it('Cannot click on disabled icon button with text', () => {
    const message = 'Disabled Icon Button With Text';
    cy.contains(message)
      .should('be.visible')
      .and('be.disabled');
  });
});
