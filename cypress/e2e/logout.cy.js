import "../support/commands";

describe("Test E2E", () => {
  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Logout test", () => {
    // get element by class: <div class="product_label">Products</div>
    cy.get('[class="product_label"]').should("be.visible");
    cy.get("button").contains("Open Menu").click()
    cy.get('[id="logout_sidebar_link"]').click()
    cy.get('[id="login-button"]').should("be.visible");
  });
});