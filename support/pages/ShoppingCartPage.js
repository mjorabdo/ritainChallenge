class ShoppingCartPage {
  get = {
    inventoryItemName: () => cy.get(".inventory_item_name"),
    inventoryItemDesc: () => cy.get(".inventory_item_desc"),
    inventoryItemPrice: () => cy.get(".inventory_item_price"),
    linkShoppingCart: () => cy.get('a[class="shopping_cart_link"]'),
    cartItem: () => cy.get('div[class="cart_item"]'),
    removeButton: () => cy.get("[id^=remove]"),
    shoppingCartBadge: () => cy.get('span[class="shopping_cart_badge"]'),
    yourCartTitle: () => cy.get(".title"),
  };
  CheckInventoryName() {
    this.get.inventoryItemName();
  }

  CheckInventoryItemDesc() {
    this.get.inventoryItemDesc();
  }
  CheckInventoryItemPrice() {
    this.get.inventoryItemPrice();
  }
  ClickLinkShoppingCart() {
    this.get.linkShoppingCart().click();
  }
  GetCartItem() {
    this.get.cartItem();
  }
  RemoveButton() {
    this.get.removeButton().click();
  }
  GetAddItemSC() {
    this.get.shoppingCartBadge();
  }
  
}
export const shoppingCartPage = new ShoppingCartPage();
