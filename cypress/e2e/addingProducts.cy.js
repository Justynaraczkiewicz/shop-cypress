import { products } from "../support/constants";
import { enterToDetails } from "../support/shared";

describe("Adding products to card", () => {
 

  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Adding Product to Cart from Details", () => {

    for (const product of products) {
      enterToDetails(product);
      cy.get("button").contains("ADD TO CART").click();
      getCartBadge().should("contain", "1");
      // Wejście do koszyka
      cy.get('[id="shopping_cart_container"]').click();
      //Usunięcie z koszyka
      cy.get('button[class*="cart_button"]').click();
      getCartBadge().should("not.exist");
      //Kliknięcie Continue Shopping
      cy.get('[class="btn_secondary"]')
        .should("contain", "Continue Shopping")
        .click();
    }
  });
});

function getCartBadge() {
  return cy.get('span[class*="shopping_cart_badge"]');
}

