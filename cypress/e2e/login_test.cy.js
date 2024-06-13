import "../support/commands";

describe("Test E2E", () => {
  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Loging test", () => {
    // get element by class: <div class="product_label">Products</div>
    cy.get('[class="product_label"]').should("be.visible");
  });
});
