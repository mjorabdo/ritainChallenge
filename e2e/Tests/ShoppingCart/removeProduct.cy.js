import { loginPage } from "../../../support/pages/LoginPage";
import { productListPage } from "../../../support/pages/ProductListPage";
import { shoppingCartPage } from "../../../support/pages/ShoppingCartPage";
import { productDetailPage } from "../../../support/pages/ProductDetailPage";
const inventoryHtml = Cypress.env("saucedemo");
const base = Cypress.env("baseUrl");

describe("US-3 | TS | ✅Saucedemo | SCP | Remove a product added to the shopping cart ", () => {
  beforeEach("The user is logged in with a valid username", () => {
    cy.visit(base);
    cy.url().should("contain", "saucedemo");
    loginPage.fillUsernameField(inventoryHtml.login.users.correctUser);
    loginPage.fillPasswordField(inventoryHtml.login.users.correctPass);
    loginPage.ClickLoginButton();
  });

  it("TC1: Validate remove a product from the PLP", () => {
    productListPage.addRandomItemPLP();
    shoppingCartPage.RemoveButton();
    productListPage.get.addToCartButton().should("be.visible");
  });

  it("TC2: Validate remove a product from the PDP", () => {
    productDetailPage.addRandomItemPDP();
    productListPage.get.addToCartButton().click();
    shoppingCartPage.RemoveButton();
    productListPage.get.addToCartButton().should("be.visible");
  });
  it("TC3: Validate remove a product from the SCP", () => {
    productDetailPage.addRandomItemPDP();
    productDetailPage.get.addToCartButton().click();
    shoppingCartPage.ClickLinkShoppingCart();
    shoppingCartPage.get.yourCartTitle().should("be.visible");
    shoppingCartPage.get.cartItem().should("exist");
    shoppingCartPage.RemoveButton();
    shoppingCartPage.get.cartItem().should("not.exist");
  });
});
