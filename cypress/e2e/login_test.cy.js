import "../support/commands";

describe("Test E2E", () => {
  const product = "Sauce Labs Bike Light";
  const price = "9.99";

  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Loging test", () => {
    // get element by class: <div class="product_label">Products</div>
    cy.get('[class="product_label"]').should("be.visible");
  });

  it("Checking Procucts", () => {
    cy.get('[class="inventory_item_name"]')
      .contains(product)
      .should("be.visible");

    //Szukanie przez rodziców
    // <div class="inventory_item">
    //   <div class="inventory_item_img"></div>
    //   <div class="inventory_item_label">
    //       <a href="./inventory-item.html?id=2" id="item_2_title_link">
    //           <div class="inventory_item_name">Sauce Labs Onesie</div>
    //       </a>
    //   </div>
    //   <div class="pricebar">
    //       <div class="inventory_item_price">$7.99</div><button class="btn_primary btn_inventory">ADD TO CART</button>
    //   </div>
    // </div>
    cy.get('[class="inventory_item_name"]')
      .contains(product)
      .parents('[class="inventory_item"]')
      .should("contain", price);

    cy.get('[class="inventory_item_name"]').contains(product).click();
    cy.get('[class="inventory_details_name"]').should("contain", product);
    cy.get('[class="inventory_details_price"]').should("contain", price);
  });

  it("Adding Product to Cart from Deatails", () => {
    cy.get('[class="inventory_item_name"]').contains(product).click();
    cy.get("button").contains("ADD TO CART").click();
    cy.get('span[class*="shopping_cart_badge"]').should("contain", "1");
  });
});
