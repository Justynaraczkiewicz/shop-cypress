import "../support/commands";
import { products, itemTotal } from "../support/constants";

describe("Test checkout", () => {
  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Checkout", () => {
    // go to https://www.saucedemo.com/v1/inventory.html and verify
    cy.visit("www.saucedemo.com/v1/inventory.html");
    // add to cart all products (loop)

    for (const product of products) {
      cy.get('[class="inventory_item_name"]')
        .contains(product.name)
        .parents('[class="inventory_item"]')
        .get("button")
        .contains("ADD TO CART")
        .click();
    }

    // go to cart
    cy.get('[id="shopping_cart_container"]').click();
    // click checkout
    cy.get('[class*="checkout_button"]').click();
    // fill 3 textboxes
    cy.get('[id="first-name"]').type("Jan");
    cy.get('[id="last-name"]').type("Kowalski");
    cy.get('[id="postal-code"]').type("12345");

    // click continue
    cy.get('[class*="cart_button"]').click();
    // verify if all products are correct (name, quantity and price) (loop)
    for (const product of products) {
      cy.get('[class="inventory_item_name"]')
        .contains(product.name)
        .parents('[class="cart_item_label"]')
        .should("contain", product.price);
    }
    // verify Total amount
    cy.get('[class="summary_subtotal_label"]').contains(itemTotal);
    // click finish and veridy success page
    cy.get('[class*="cart_button"]').click();
    cy.get('[class="complete-header"]').should(
      "contain",
      "THANK YOU FOR YOUR ORDER"
    );
  });
});
