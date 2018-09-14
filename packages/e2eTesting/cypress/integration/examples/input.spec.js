describe("Sample Test", () => {
  it("Displays some text", () => {
    const version = Cypress.env("version") || "15";
    cy.visit(`http://localhost:8080/react_${version}.html`);

    cy.contains("Whatup!!");
    cy.get("input").should("be.visible");
  });
});
