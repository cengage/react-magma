const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env('version') || versionNumber;
    cy.visit(`/react_${version}.html`);
  });

  it('Displays and interacts text input', () => {
    const message = 'Hello There';
    cy.get('#defaultInput').as('input');

    cy.get('@input').should('be.visible');
    cy.get('@input').type(message);

    cy.get('@input').should('have.value', message);
  });

  it('Displays and interacts number input', () => {
    const message = '1234';
    cy.get('#numberInput').as('input');

    cy.get('@input').should('be.visible');
    cy.get('@input').type(message);

    cy.get('@input').should('have.value', message.toString());
  });

  it('Displays only numbers in number input', () => {
    const textString = 'abc';
    const numberString = '123';
    const message = `${textString}${numberString}`;
    cy.get('#numberInput').as('input');

    cy.get('@input').should('be.visible');
    cy.get('@input').type(message);

    cy.get('@input').should('not.have.value', message);
    cy.get('@input').should('have.value', numberString);
  });

  it('Displays and interacts password input', () => {
    const message = 'password';
    cy.get('#passwordInput').as('input');

    cy.get('@input').should('be.visible');
    cy.get('@input').type(message);

    cy.get('@input').should('have.value', message);
  });

  it('Auto Focus input', () => {
    cy.focused().should('have.attr', 'id', 'focusedInput');
  });

  it('Makes an input required', () => {
    cy.get('#requiredInput').should('have.attr', 'required');
  });

  it('Makes an input disabled', () => {
    cy.get('#disabledInput').should('have.attr', 'disabled');
  });

  it('Creates a label for the input', () => {
    cy.get('label').should('have.attr', 'for', 'labeledInput');
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
