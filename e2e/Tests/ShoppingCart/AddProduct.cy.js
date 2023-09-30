import { loginPage } from "../../../support/pages/LoginPage";
import { productListPage } from "../../../support/pages/ProductListPage";
import { shoppingCartPage } from "../../../support/pages/ShoppingCartPage";
import { productDetailPage } from "../../../support/pages/ProductDetailPage";

const inventoryHtml = Cypress.env("saucedemo");
const base = Cypress.env("baseUrl");

describe("US-1| TS: ✅Saucedemo | SCP | Agregar producto al carrito de compras desde el PLP o PDP", () => {
  beforeEach("User log in Swag Labs Website", () => {
    cy.visit(base);
    loginPage.fillUsernameField(inventoryHtml.login.users.correctUser);
    loginPage.fillPasswordField(inventoryHtml.login.users.correctPass);
    loginPage.ClickLoginButton();
    loginPage.CheckNoProductAdded();
  });

  it("TC1: Add one product from the PLP to the Shopping-Cart successfully", () => {
    cy.url().should("include", inventoryHtml.endpoint.inventory);
    productListPage.addRandomItemPLP();
    shoppingCartPage.get
      .removeButton()
      .should("be.visible")
      .should("have.lengthOf", 1)
      .should("exist");
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
    productListPage.validateItemSC();
    shoppingCartPage.get
      .shoppingCartBadge()
      .should("exist")
      .should("contain", "1");
  });
  it("TC2: Add one product from the PDP to the Shopping-Cart successfully", () => {
    productDetailPage.addRandomItemPDP();
    productListPage.ClickAddToCartButton();
    cy.url().should("contain", inventoryHtml.endpoint.product);
    shoppingCartPage.get
      .removeButton()
      .should("be.visible")
      .should("have.lengthOf", 1)
      .should("exist");
    cy.get(".inventory_item_container")
      .eq(0)
      .within(() => {
        expect(".inventory_details_desc_container").to.exist;
        cy.get(".inventory_details_name")
          .invoke("text")
          .then((title) => {
            expect(title).to.exist;
          });
        cy.get(".inventory_details_desc")
          .invoke("text")
          .then((desc) => {
            expect(desc).to.exist;
          });
        cy.get(".inventory_details_price")
          .invoke("text")
          .then((precio) => {
            expect(precio).to.exist;
          });
      });
    shoppingCartPage.ClickLinkShoppingCart();
    productDetailPage.validateItemSC();
    shoppingCartPage.get
      .shoppingCartBadge()
      .should("exist")
      .should("contain", "1");
  });
});
