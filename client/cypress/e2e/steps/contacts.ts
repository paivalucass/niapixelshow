import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Given("o usuário está na pagina principal", function () {
    cy.visit('/');
});

When('clica no botão \"Contato\"', () => {
    cy.get('button').contains('Contato').click();
});

Then('o usuário agora está na página de contatos', () => {
    cy.url().should("include", "/contact");
});