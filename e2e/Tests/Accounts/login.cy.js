import { loginPage } from "../../../support/pages/LoginPage";
import { productDetailPage } from "../../../support/pages/ProductDetailPage";
const inventoryHtml = Cypress.env("saucedemo");
const base = Cypress.env("baseUrl");
describe("US-2 | TS | ✅Saucedemo | Account | Login", () => {
  beforeEach("User should be situated in the website", () => {
    cy.visit(base);
    cy.url().should("eq", "https://www.saucedemo.com/");
  });
  it('TC1: validate that you can log in successfully with the "standard_user" account', () => {
    loginPage.fillUsernameField(inventoryHtml.login.users.correctUser);
    loginPage.fillPasswordField(inventoryHtml.login.users.correctPass);
    loginPage.ClickLoginButton();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    cy.get("#header_container").should("contain.text", "Swag Labs");
    cy.get("#inventory_container").should("be.visible");
  });
  it('TC2: validate that you can log in successfully with the "problem_user" account', () => {
    loginPage.fillUsernameField(inventoryHtml.login.users.problemUser);
    loginPage.fillPasswordField(inventoryHtml.login.users.correctPass);
    loginPage.ClickLoginButton();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    productDetailPage.get.headerHomePage().should("contain.text", "Swag Labs");
    productDetailPage.get.homePage().should("be.visible");
  });

  it("TC5: Validar intentar iniciar sesión con cuenta incorrecta o inexistente.", () => {
    loginPage.fillUsernameField(inventoryHtml.login.users.userInv);
    loginPage.fillPasswordField(inventoryHtml.login.users.passInv);
    loginPage.ClickLoginButton();
    cy.contains(inventoryHtml.login.errorMsg.PassOrUserInv).should(
      "be.visible"
    );
  });
});
