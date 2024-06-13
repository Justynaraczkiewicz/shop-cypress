

export function backFromDetails() {
  cy.get('[class="inventory_details_back_button"]').click({ force: true });
}

export function enterToDetails(product) {
  cy.get('[class="inventory_item_name"]').contains(product.name).click();
}
