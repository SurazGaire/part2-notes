describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note app, Bootcamp fellowship at Tej fellowship");
  });
  it("login form can be opened", function () {
    cy.contains("Login").click();
  });
  it("user can login", function () {
    cy.contains("Login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.contains("Matti Luukkainen logged in");
  });
});
