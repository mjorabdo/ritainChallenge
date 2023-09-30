class CheckoutPage {
  get = {
    checkoutBtn: () => cy.get('[data-test="checkout"]'),
    firstNameCheckoutForm: () => cy.get('[data-test="firstName"]'),
    lastNameCheckoutForm: () => cy.get('[data-test="lastName"]'),
    postCodeCheckoutForm: () => cy.get('[data-test="postalCode"]'),
    continueBtn: () => cy.get('[data-test="continue"]'),
    finishBtn: () => cy.get('[data-test="finish"]'),
    checkoutTitle: () => cy.get(".title"),
    checkoutContainer: () => cy.get("#checkout_complete_container"),
    cancelBtn: () => cy.get('[data-test="cancel"]'),
    paymentInfo: () => cy.get(".summary_info > :nth-child(1)"),
    shippingInfo: () => cy.get(".summary_info > :nth-child(3)"),
    priceTotal: () => cy.get(".summary_info > :nth-child(5)"),
    totalSum:()=> cy.get('.summary_total_label')
  };

  clickCheckoutBtn() {
    this.get.checkoutBtn().click();
  }

  fillFirstNameCheckoutForm(text) {
    this.get.firstNameCheckoutForm().type(text);
  }
  fillLastNameCheckoutForm(text) {
    this.get.lastNameCheckoutForm().type(text);
  }
  fillPostCodeCheckoutForm(text) {
    this.get.postCodeCheckoutForm().type(text);
  }
  clickContinueBtn() {
   this.get.continueBtn().click();
  }
  clickFinishBtn() {
    this.get.finishBtn().click();
  }
  getCheckoutTitle() {
    return this.get.checkoutTitle();
  }
  getCheckoutContainer() {
    return this.get.checkoutContainer();
  }
  ClickCancelBtn() {
    this.get.cancelBtn().click();
  }
}

export const checkoutPage = new CheckoutPage();
