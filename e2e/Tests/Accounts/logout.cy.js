import { loginPage } from "../../../support/pages/LoginPage";
import { productListPage } from "../../../support/pages/ProductListPage";
const inventoryHtml = Cypress.env("saucedemo");
const base = Cypress.env("baseUrl");

describe("US-6 | TS | ✅Saucedemo | Account | Logout", () => {
  beforeEach("User should be situated in the website and be logged in.", () => {
    cy.visit(base);
    cy.url().should("eq", "https://www.saucedemo.com/");
  });
  it("TC1: validate logout successfully", () => {
    loginPage.fillUsernameField(inventoryHtml.login.users.correctUser);
    loginPage.fillPasswordField(inventoryHtml.login.users.correctPass);
    loginPage.ClickLoginButton();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    cy.get("#header_container").should("contain.text", "Swag Labs");
    cy.get("#inventory_container").should("be.visible");
    productListPage.clickBurgerMenu();
    productListPage.get.itemList().should("be.visible");
    productListPage.clickLogout();
    cy.url().should("eq", "https://www.saucedemo.com/");
  });
});
