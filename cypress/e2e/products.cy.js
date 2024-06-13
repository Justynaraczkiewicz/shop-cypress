import { products } from "../support/constants";
import { enterToDetails, backFromDetails } from "../support/shared";

describe("Comparing products from main page to second page", () => {
  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Checking Procucts", () => {
    for (const product of products) {
      checkProduct(product);
    }
  });
});

function checkProduct(product) {
  cy.get('[class="inventory_item_name"]')
    .contains(product.name)
    .parents('[class="inventory_item"]')
    .should("contain", product.price);

  enterToDetails(product);
  cy.get('[class="inventory_details_name"]').should("contain", product.name);
  cy.get('[class="inventory_details_price"]').should("contain", product.price);
  backFromDetails();
}
