import { products } from "../support/constants";
import { enterToDetails } from "../support/shared";

describe("Adding products to card", () => {
  const getAmountInCart = cy.get('span[class*="shopping_cart_badge"]');

  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Adding Product to Cart from Details", () => {
    for (const product of products) {
      enterToDetails(product);
      cy.get("button").contains("ADD TO CART").click();
      getAmountInCart.should("contain", "1");
      // Wejście do koszyka
      cy.get('[id="shopping_cart_container"]').click();
      //Usunięcie z koszyka
      cy.get('button[class*="cart_button"]').click();
      getAmountInCart.should("not.exist");
      //Kliknięcie Continue Shopping
      cy.get('[class="btn_secondary"]')
        .should("contain", "Continue Shopping")
        .click();
    }
  });
});

