import { loginPage } from "../../../support/pages/LoginPage";
import { shoppingCartPage } from "../../../support/pages/ShoppingCartPage";
import { checkoutPage } from "../../../support/pages/CheckoutPage";
import { productListPage } from "../../../support/pages/ProductListPage";
const inventoryHtml = Cypress.env("saucedemo");
const base = Cypress.env("baseUrl");

describe("US-4 | Saucedemo | Checkout | Completing or Canceling the Purchase of a Product on the Website", () => {
  let data;

  before("before", () => {
    cy.fixture("data").then((datos) => {
      data = datos;
    });
  });
  beforeEach(
    "User must be logged in and starts a puchase on the website",
    () => {
      cy.visit(base);
      loginPage.fillUsernameField(inventoryHtml.login.users.correctUser);
      loginPage.fillPasswordField(inventoryHtml.login.users.correctPass);
      loginPage.ClickLoginButton();
      productListPage.addRandomItemPLP();
      shoppingCartPage.ClickLinkShoppingCart();
      checkoutPage.clickCheckoutBtn();
      checkoutPage.fillFirstNameCheckoutForm(data.dataFormCheckout.firstName);
      checkoutPage.fillLastNameCheckoutForm(data.dataFormCheckout.lastName);
      checkoutPage.fillPostCodeCheckoutForm(data.dataFormCheckout.postCode);
      checkoutPage.clickContinueBtn();
    }
  );

  it("TC1:  Validate the successful completion of a product purchase. ", () => {
    checkoutPage.get.paymentInfo().should("exist");
    checkoutPage.get.shippingInfo().should("exist");
    checkoutPage.get.priceTotal().should("exist");
    checkoutPage.get.totalSum().should("exist");
    checkoutPage.clickFinishBtn();
    checkoutPage.getCheckoutTitle().should("contain", "Complete");
    checkoutPage.getCheckoutContainer().within(() => {
      cy.contains(".complete-header", "THANK YOU FOR YOUR ORDER", {
        matchCase: false,
      });
      cy.contains(
        ".complete-text",
        "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
        {
          matchCase: false,
        }
      );
    });
  });
  it("TC2: Validate the successful cancellation of a product purchase. ", () => {
    checkoutPage.ClickCancelBtn();
    cy.url().should("include", inventoryHtml.endpoint.inventory);
    shoppingCartPage.ClickLinkShoppingCart();
    cy.get(".cart_item").within(() => {
      expect(".cart_item").to.exist;
      cy.get("a")
        .invoke("text")
        .then((title) => {
          expect(title).to.exist;
        });
      cy.get(".inventory_item_desc")
        .invoke("text")
        .then((desc) => {
          expect(desc).to.exist;
        });
      cy.get(".inventory_item_price")
        .invoke("text")
        .then((precio) => {
          expect(precio).to.exist;
        });
    });
  });
});
