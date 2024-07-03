
import "../support/commands";



describe("Test E2E", () => {


  it("Loging test", () => {
    cy.loginToApplication();
    // get element by class: <div class="product_label">Products</div>
    cy.get('[class="product_label"]').should("be.visible");
  });
});
