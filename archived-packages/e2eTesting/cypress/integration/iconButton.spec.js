describe('Icon Button', () => {
  beforeEach(() => {
    cy.visit(`/react_16_5.html`);
  });

  it('Displays and interacts with icon button', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.contains('Default Icon Button With Text').as('button');
    cy.get('@button').should('be.visible');
    cy.get('@button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('clicked');
      });
  });

  it('Cannot click on disabled button', () => {
    cy.contains('Disabled Icon Button With Text')
      .should('be.visible')
      .and('be.disabled');
  });

  it('Displays and interacts with icon only button', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('button[aria-label="Default Icon Button"]').as('button');

    cy.get('@button').should('be.visible');

    cy.get('@button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('clicked');
      });
  });

  it('Cannot click on disabled icon only button', () => {
    cy.get('button[aria-label="Disabled Icon Button"]')
      .should('be.visible')
      .and('be.disabled');
  });
});
