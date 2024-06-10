import "../support/commands";

describe("Test E2E", () => {
  const products = [
    {
      name: "Sauce Labs Bike Light",
      price: "9.99",
    },
    {
      name: "Sauce Labs Backpack",
      price: "29.99",
    },
    {
      name: "Sauce Labs Bolt T-Shirt",
      price: "15.99",
    },
  ];

  const itemTotal = "55.97";

  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Loging test", () => {
    // get element by class: <div class="product_label">Products</div>
    cy.get('[class="product_label"]').should("be.visible");
  });

  it("Checking Procucts", () => {
    for (const product of products) {
      checkProduct(product);
    }
  });

  it("Adding Product to Cart from Details", () => {
    for (const product of products) {
      enterToDetails(product);
      cy.get("button").contains("ADD TO CART").click();
      cy.get('span[class*="shopping_cart_badge"]').should("contain", "1");
      // Wejście do koszyka
      cy.get('[id="shopping_cart_container"]').click();
      //Usunięcie z koszyka
      cy.get('button[class*="cart_button"]').click();
      //Sprawdzenie czy koszyk jest pusty
      cy.get('span[class*="shopping_cart_badge"]').should("not.exist");
      //Kliknięcie Continue Shopping
      cy.get('[class="btn_secondary"]')
        .should("contain", "Continue Shopping")
        .click();
    }
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

function backFromDetails() {
  cy.get('[class="inventory_details_back_button"]').click({ force: true });
}

function enterToDetails(product) {
  cy.get('[class="inventory_item_name"]').contains(product.name).click();
}
