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

  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Loging test", () => {
    // get element by class: <div class="product_label">Products</div>
    cy.get('[class="product_label"]').should("be.visible");
  });

  it("Checking Procucts", () => {
      checkProduct(products[0]);
      checkProduct(products[1]);
      checkProduct(products[2]);
  });

  it("Adding Product to Cart from Details", () => {
    for (const product of products) {
      enterToDetails(product);
      cy.get("button").contains("ADD TO CART").click();
      cy.get('span[class*="shopping_cart_badge"]').should("contain", "1");
      // Wejście do koszyka
      cy.get('[id="shopping_cart_container"]').click()
      //Usunięcie z koszyka
      cy.get('button[class*="cart_button"]').click()
      //Sprawdzenie czy koszyk jest pusty
      cy.get('span[class*="shopping_cart_badge"]').should('not.exist')
      //Kliknięcie Continue Shopping
      cy.get('[class="btn_secondary"]').should("contain", "Continue Shopping").click()
      
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

function backFromDetails() {
  cy.get('[class="inventory_details_back_button"]').click({ force: true });
}

function enterToDetails(product) {
  cy.get('[class="inventory_item_name"]').contains(product.name).click();
}
