const runTests = versionNumber => {
  beforeEach(() => {
    const version = Cypress.env("version") || versionNumber;
    cy.visit(`http://localhost:8080/react_${version}.html`);
  });

  it("Displays and interacts text input", () => {
    const message = "Hello There";
    const input = cy.get("#defaultInput");

    input.should("be.visible");
    input.type(message);

    input.should("have.value", message);
  });

  it("Displays and interacts number input", () => {
    const message = "1234";
    const input = cy.get("#numberInput");

    input.should("be.visible");
    input.type(message);

    input.should("have.value", message.toString());
  });

  it("Displays only numbers in number input", () => {
    const textString = "abc";
    const numberString = "123";
    const message = `${textString}${numberString}`;
    const input = cy.get("#numberInput");

    input.should("be.visible");
    input.type(message);

    input.should("not.have.value", message);
    input.should("have.value", numberString);
  });

  it("Displays and interacts password input", () => {
    const message = "password";
    const input = cy.get("#passwordInput");

    input.should("be.visible");
    input.type(message);

    input.should("have.value", message);
  });

  it("Auto Focus input", () => {
    const input = cy.focused();

    input.should("have.attr", "id", "focusedInput");
  });

  it("Makes an input required", () => {
    const input = cy.get("#requiredInput");

    input.should("have.attr", "required");
  });

  it("Makes an input disabled", () => {
    const message = "disabled";
    const input = cy.get("#disabledInput");

    input.should("have.attr", "disabled");
  });

  it("Creates a label for the input", () => {
    const label = cy.get("label");

    label.should("have.attr", "for", "labeledInput");
  });
};

describe("React 15 Input", () => {
  runTests(15);
});

describe("React 16 Input", () => {
  runTests(16);
});
